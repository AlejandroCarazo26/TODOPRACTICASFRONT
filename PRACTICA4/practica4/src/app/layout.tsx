import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title: "Twitter Clone",
  description: "Clon funcional de Twitter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  );
}