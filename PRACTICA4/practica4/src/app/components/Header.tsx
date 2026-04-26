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

  useEffect(() => {
    getMe().then((data) => {
      setMe(data.user || data);
    }).catch(() => {});
  }, []);

  return (
    <header>
      <div className="header-inner">
        <Link href="/" className="header-logo">
          TwitterClone
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
        </div>
      </div>
    </header>
  );
}