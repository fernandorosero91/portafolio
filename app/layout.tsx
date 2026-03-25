import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Fernando Rosero - Portafolio Profesional",
  description: "Portafolio profesional de Elier Fernando Rosero Bravo - Estudiante de Ingeniería de Software & Contador Público",
  keywords: ["portafolio", "desarrollador", "software", "contador", "Next.js", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'light') {
                  document.documentElement.classList.add('light-mode');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
