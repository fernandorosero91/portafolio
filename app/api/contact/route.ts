import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verificar la configuración del transportador
transporter.verify((error, success) => {
  if (error) {
    console.error('Error en la configuración de Nodemailer:', error);
  } else {
    console.log('Servidor de email listo para enviar mensajes');
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, timestamp } = body;

    // Validaciones básicas
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Configurar el email para ti (notificación)
    const mailOptionsToYou = {
      from: `"Portafolio - Formulario de Contacto" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `📩 Nuevo mensaje de contacto: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #4A6FA8 0%, #2E446B 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #e0e0e0;
            }
            .field {
              margin-bottom: 20px;
              background: white;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #4A6FA8;
            }
            .field-label {
              font-weight: bold;
              color: #4A6FA8;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 15px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #F59E0B;
              margin-top: 20px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
            .reply-button {
              display: inline-block;
              background: #4A6FA8;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📩 Nuevo Mensaje de Contacto</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">👤 Nombre</div>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <div class="field-label">📧 Email</div>
              <div class="field-value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">📋 Asunto</div>
              <div class="field-value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="field-label">🕐 Fecha y Hora</div>
              <div class="field-value">${timestamp || new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</div>
            </div>
            
            <div class="message-box">
              <div class="field-label">💬 Mensaje</div>
              <div class="field-value" style="margin-top: 10px;">${message}</div>
            </div>
            
            <center>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="reply-button">
                Responder a ${name}
              </a>
            </center>
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de tu portafolio</p>
            <p>Portafolio de Fernando Rosero - ${new Date().getFullYear()}</p>
          </div>
        </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto

Nombre: ${name}
Email: ${email}
Asunto: ${subject}
Fecha: ${timestamp || new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}

Mensaje:
${message}

---
Responder a: ${email}
      `,
    };

    // Configurar email de confirmación para el usuario
    const mailOptionsToUser = {
      from: `"Fernando Rosero" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `✅ Mensaje recibido: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #10B981 0%, #059669 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #e0e0e0;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #10B981;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ ¡Mensaje Recibido!</h1>
          </div>
          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>
            
            <p>Gracias por contactarme. He recibido tu mensaje y te responderé lo antes posible.</p>
            
            <div class="message-box">
              <p><strong>Tu mensaje:</strong></p>
              <p style="white-space: pre-wrap; word-wrap: break-word;">${message}</p>
            </div>
            
            <p>Normalmente respondo en un plazo de 24-48 horas.</p>
            
            <p>Saludos,<br>
            <strong>Fernando Rosero</strong><br>
            Ingeniero de Software & Contador Público</p>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático, por favor no respondas a este email.</p>
            <p>Portafolio de Fernando Rosero - ${new Date().getFullYear()}</p>
          </div>
        </body>
        </html>
      `,
      text: `
Hola ${name},

Gracias por contactarme. He recibido tu mensaje y te responderé lo antes posible.

Tu mensaje:
${message}

Normalmente respondo en un plazo de 24-48 horas.

Saludos,
Fernando Rosero
Ingeniero de Software & Contador Público

---
Este es un mensaje automático, por favor no respondas a este email.
      `,
    };

    // Enviar ambos emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email enviado exitosamente' 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error al enviar el email:', error);
    return NextResponse.json(
      { 
        error: 'Error al enviar el email',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
