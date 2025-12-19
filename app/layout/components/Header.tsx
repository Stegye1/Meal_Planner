"use client";

import Image from "next/image";
import React from "react";
import { AvatarMenu } from "./AvatarMenu";
import { HeaderChoices } from "./HeaderChoices";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Image src="/logo.jpg" alt="Logo" width={24} height={24} />
        </div>

        <HeaderChoices />
        <AvatarMenu />
        {actions && <div className="header-actions">{actions}</div>}
      </nav>
    </header>
  );
}
