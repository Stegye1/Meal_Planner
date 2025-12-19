"use client";

import { User } from "lucide-react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { UserModal } from "./UserModal";

type UserData = {
  email: string;
  name: string;
};

export function AvatarMenu() {
  const [user, setUser, removeUser] = useLocalStorage<UserData | null>("user", null);
  const [open, setOpen] = useState(false);

  const isLoggedIn = !!user;

  const avatarTitle = isLoggedIn ? `${user?.name}` : "Nepřihlášeno - klikněte pro přihlášení";

  return (
    <div>
      <button className={`avatar ${isLoggedIn ? "logged-in" : ""}`} title={avatarTitle} onClick={() => setOpen(true)}>
        <User size={20} />
      </button>

      {open && (
        <UserModal
          user={user}
          onClose={() => setOpen(false)}
          onLogin={() => setUser({ email: "pokus@email.cz", name: "Testovací uživatel" })}
          onLogout={removeUser}
        />
      )}
    </div>
  );
}
