import Link from "next/link";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata = {
  title: "Twitter Clone",
  description: "Clon funcional de Twitter",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <html lang="es">
      <body>
        <header>
          <div className="header-inner">
            <Link href="/" className="header-logo">
              TwitterClone
            </Link>
            {token && (
              <nav>
                <Link href="/profile/me" className="header-profile">
                  Mi perfil
                </Link>
              </nav>
            )}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}