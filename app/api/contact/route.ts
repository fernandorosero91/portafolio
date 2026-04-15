import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/* ── Security: patterns to block ── */
const SQL_PATTERNS = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC|EXECUTE|TRUNCATE|DECLARE|CAST|CONVERT|xp_)\b|--|\/\*|\*\/)/i;
const XSS_PATTERNS = /<script|javascript:|on\w+\s*=|eval\s*\(|document\.|window\.|alert\s*\(/i;
const SPAM_PATTERNS = /(viagra|casino|lottery|crypto|bitcoin|click here|free money|make money|buy now|limited offer)/i;

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function hasMaliciousContent(val: string): string | null {
  if (SQL_PATTERNS.test(val)) return 'Contenido potencialmente peligroso detectado';
  if (XSS_PATTERNS.test(val)) return 'Contenido no permitido detectado';
  if (SPAM_PATTERNS.test(val)) return 'Contenido detectado como spam';
  return null;
}

/* ── Rate limiting (in-memory, per IP) ── */
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;       // max requests
const RATE_LIMIT_WINDOW = 60000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

/* ── Nodemailer ── */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    /* ── Rate limit ── */
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Espera un minuto.' },
        { status: 429 }
      );
    }

    /* ── Parse body ── */
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    /* ── Honeypot check ── */
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Enviado' }, { status: 200 });
    }

    /* ── Required fields ── */
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    /* ── Trim & validate lengths ── */
    const trimName = String(name).trim();
    const trimEmail = String(email).trim().toLowerCase();
    const trimSubject = String(subject).trim();
    const trimMessage = String(message).trim();

    if (trimName.length < 2 || trimName.length > 50) {
      return NextResponse.json({ error: 'Nombre: 2-50 caracteres' }, { status: 400 });
    }
    if (trimEmail.length < 5 || trimEmail.length > 100) {
      return NextResponse.json({ error: 'Email: 5-100 caracteres' }, { status: 400 });
    }
    if (trimSubject.length < 3 || trimSubject.length > 100) {
      return NextResponse.json({ error: 'Asunto: 3-100 caracteres' }, { status: 400 });
    }
    if (trimMessage.length < 10 || trimMessage.length > 1000) {
      return NextResponse.json({ error: 'Mensaje: 10-1000 caracteres' }, { status: 400 });
    }

    /* ── Only spaces check ── */
    if (/^\s*$/.test(trimName) || /^\s*$/.test(trimSubject) || /^\s*$/.test(trimMessage)) {
      return NextResponse.json({ error: 'Los campos no pueden contener solo espacios' }, { status: 400 });
    }

    /* ── Email format ── */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    /* ── Name: only letters ── */
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(trimName)) {
      return NextResponse.json({ error: 'El nombre solo puede contener letras' }, { status: 400 });
    }

    /* ── Injection / XSS / Spam checks ── */
    for (const [field, val] of [['nombre', trimName], ['email', trimEmail], ['asunto', trimSubject], ['mensaje', trimMessage]]) {
      const threat = hasMaliciousContent(val);
      if (threat) {
        return NextResponse.json({ error: `${threat} en ${field}` }, { status: 400 });
      }
    }

    /* ── Sanitize for HTML email ── */
    const safeName = sanitizeHtml(trimName);
    const safeEmail = sanitizeHtml(trimEmail);
    const safeSubject = sanitizeHtml(trimSubject);
    const safeMessage = sanitizeHtml(trimMessage);
    const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

    /* ── Send notification email ── */
    await transporter.sendMail({
      from: `"Portafolio - Contacto" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: trimEmail,
      subject: `📩 Nuevo mensaje: ${safeSubject}`,
      html: `
        <div style="font-family:Segoe UI,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#4A6FA8,#2E446B);color:#fff;padding:24px;border-radius:10px 10px 0 0;text-align:center">
            <h1 style="margin:0;font-size:20px">📩 Nuevo Mensaje de Contacto</h1>
          </div>
          <div style="background:#f9f9f9;padding:24px;border-radius:0 0 10px 10px;border:1px solid #e0e0e0">
            <div style="background:#fff;padding:12px;border-radius:8px;border-left:4px solid #4A6FA8;margin-bottom:12px">
              <div style="font-size:11px;font-weight:bold;color:#4A6FA8;text-transform:uppercase">Nombre</div>
              <div style="font-size:14px;color:#333">${safeName}</div>
            </div>
            <div style="background:#fff;padding:12px;border-radius:8px;border-left:4px solid #4A6FA8;margin-bottom:12px">
              <div style="font-size:11px;font-weight:bold;color:#4A6FA8;text-transform:uppercase">Email</div>
              <div style="font-size:14px;color:#333">${safeEmail}</div>
            </div>
            <div style="background:#fff;padding:12px;border-radius:8px;border-left:4px solid #4A6FA8;margin-bottom:12px">
              <div style="font-size:11px;font-weight:bold;color:#4A6FA8;text-transform:uppercase">Asunto</div>
              <div style="font-size:14px;color:#333">${safeSubject}</div>
            </div>
            <div style="background:#fff;padding:12px;border-radius:8px;border-left:4px solid #4A6FA8;margin-bottom:12px">
              <div style="font-size:11px;font-weight:bold;color:#4A6FA8;text-transform:uppercase">Fecha</div>
              <div style="font-size:14px;color:#333">${timestamp}</div>
            </div>
            <div style="background:#fff;padding:16px;border-radius:8px;border-left:4px solid #F59E0B;margin-top:16px">
              <div style="font-size:11px;font-weight:bold;color:#F59E0B;text-transform:uppercase">Mensaje</div>
              <div style="font-size:14px;color:#333;margin-top:8px;white-space:pre-wrap;word-wrap:break-word">${safeMessage}</div>
            </div>
          </div>
          <div style="text-align:center;margin-top:20px;color:#666;font-size:11px">
            <p>Enviado desde el portafolio de Fernando Rosero — ${new Date().getFullYear()}</p>
          </div>
        </div>
      `,
      text: `Nombre: ${trimName}\nEmail: ${trimEmail}\nAsunto: ${trimSubject}\nFecha: ${timestamp}\n\nMensaje:\n${trimMessage}`,
    });

    /* ── Send confirmation to user ── */
    await transporter.sendMail({
      from: `"Fernando Rosero" <${process.env.GMAIL_USER}>`,
      to: trimEmail,
      subject: `✅ Mensaje recibido: ${safeSubject}`,
      html: `
        <div style="font-family:Segoe UI,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#10B981,#059669);color:#fff;padding:24px;border-radius:10px 10px 0 0;text-align:center">
            <h1 style="margin:0;font-size:20px">✅ ¡Mensaje Recibido!</h1>
          </div>
          <div style="background:#f9f9f9;padding:24px;border-radius:0 0 10px 10px;border:1px solid #e0e0e0">
            <p>Hola <strong>${safeName}</strong>,</p>
            <p>Gracias por contactarme. He recibido tu mensaje y te responderé lo antes posible.</p>
            <div style="background:#fff;padding:16px;border-radius:8px;border-left:4px solid #10B981;margin:16px 0">
              <p style="font-weight:bold;margin:0 0 8px">Tu mensaje:</p>
              <p style="white-space:pre-wrap;word-wrap:break-word;margin:0">${safeMessage}</p>
            </div>
            <p>Normalmente respondo en 24-48 horas.</p>
            <p>Saludos,<br><strong>Fernando Rosero</strong></p>
          </div>
          <div style="text-align:center;margin-top:20px;color:#666;font-size:11px">
            <p>Este es un mensaje automático. No respondas a este email.</p>
          </div>
        </div>
      `,
      text: `Hola ${trimName},\n\nGracias por contactarme. Tu mensaje:\n${trimMessage}\n\nResponderé en 24-48 horas.\n\nFernando Rosero`,
    });

    return NextResponse.json({ success: true, message: '¡Mensaje enviado correctamente!' }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error al enviar email:', error);
    return NextResponse.json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }, { status: 500 });
  }
}
