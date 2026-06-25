import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatsApp Demo — Koala Virtual",
  description:
    "Demo interactiva de un chatbot de WhatsApp conectado a un agente de IA gestionado con n8n. Réplica visual de la interfaz web de WhatsApp.",
  icons: {
    icon: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="h-full overflow-hidden bg-[#dfe5e7]">{children}</body>
    </html>
  );
}
