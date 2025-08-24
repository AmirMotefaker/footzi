// frontend/src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css"; // <-- این خط بسیار حیاتی است

export const metadata: Metadata = {
  title: "Footzi - آنالیز فوتبال",
  description: "اپلیکیشن آنالیز آمار فوتبال لیگ برتر انگلیس",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}