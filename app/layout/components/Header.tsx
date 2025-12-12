"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  headerAction?: React.ReactNode;
}

export function Header({ headerAction: headerActionProp }: HeaderProps) {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);

  type UserData = {
    email: string;
  };

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let headerAction;
  if (pathname === "/planner") {
    headerAction = (
      <button className="nav-action" onClick={() => window.print()}>
        Vytisknout
      </button>
    );
  } else if (pathname === "/welcome") {
    headerAction = user ? (
      <button className="nav-action" onClick={handleLogout}>
        Odhlásit se
      </button>
    ) : (
      <button className="nav-action" onClick={() => setShowLogin(true)}>
        Registrace/Přihlášení
      </button>
    );
  } else if (pathname === "/meals") {
    headerAction = (
      <div className="flex">
        <Link className="nav-action" href="/meals/new-meal/">
          Přidat recept
        </Link>
        <Link className="nav-action" href="/ingredients/new-ingredient/">
          Přidat ingredienci
        </Link>
      </div>
    );
  }

  if (!headerAction && headerActionProp) {
    headerAction = headerActionProp;
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Image src="logo.jpg" alt="Logo" />
        </div>

        <ul className="nav-links">
          <li>
            <Link href="/">Úvod</Link>
          </li>

          <li>
            <Link href="/planner">Plánování jídelníčku</Link>
          </li>

          <li>
            <Link href="/videos">Videa</Link>
          </li>

          <li>
            <Link href="/meals">Recepty</Link>
          </li>

          <li>
            <Link href="/contacts">Kontakty</Link>
          </li>
        </ul>

        <div>{headerAction}</div>
      </nav>
    </header>
  );
}
