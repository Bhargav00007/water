// app/layout.tsx
import "./globals.css";
export const metadata = { title: "Water Control", description: "Control pump" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <main className="min-h-screen p-8">{children}</main>
      </body>
    </html>
  );
}
