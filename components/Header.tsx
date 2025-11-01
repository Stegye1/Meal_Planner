"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    headerAction = <button onClick={() => window.print()}>Vytisknout</button>;
  } else if (pathname === "/welcome") {
    headerAction = user ? (
      <button onClick={handleLogout}>Odhlásit se</button>
    ) : (
      <button onClick={() => setShowLogin(true)}>Registrace/Přihlášení</button>
    );
  } else if (pathname === "/recipes") {
    headerAction = <Link href="/recipes/new">Přidat recept</Link>;
  }

  if (!headerAction && headerActionProp) {
    headerAction = headerActionProp;
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>

        <ul className="nav-links">
          <li>
            <a href="/">Úvod</a>
          </li>

          <li>
            <a href="/planner">Plánování jídelníčku</a>
          </li>

          <li>
            <a href="/videos">Videa</a>
          </li>

          <li>
            <a href="/recipes">Recepty</a>
          </li>

          <li>
            <a href="/contacts">Kontakty</a>
          </li>
        </ul>

        <div className="nav-action-wrapper">{headerAction}</div>
      </nav>
    </header>
  );
}
