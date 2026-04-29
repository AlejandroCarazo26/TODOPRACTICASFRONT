"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getMe } from "@/app/lib/api/api";
import "./Header.css";

interface Me {
  _id: string;
  username: string;
}

export default function Header() {
  const [me, setMe] = useState<Me | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isLogin = pathname === "/login";

  useEffect(() => {
    const token = document.cookie.match(/token=([^;]*)/);
    if (!token) return;
    getMe().then((data) => {
      setMe(data.user || data);
    }).catch(() => {});
  }, []);

  function handleLogout() {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  }

  return (
    <header>
      <div className="header-inner">
        <Link href="/" className="header-logo">
          TwitterClone
        </Link>
        {!isLogin && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => { window.location.href = "/"; }} className="header-home">
              Home
            </button>
            {!isHome && (
              <button onClick={() => router.back()} className="header-back">
                Volver
              </button>
            )}
            {me && (
              <Link href={`/profile/${me._id}`} className="header-profile">
                @{me.username}
              </Link>
            )}
            <button onClick={handleLogout} className="header-logout">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}