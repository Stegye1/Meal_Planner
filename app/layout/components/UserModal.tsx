"use client";

import { LogIn, LogOut, X } from "lucide-react";
import "./UserModal.css";

type UserData = {
  email: string;
  name: string;
};

interface Props {
  user: UserData | null;
  onClose: () => void;
  onLogout: () => void;
  onLogin: () => void;
}

export function UserModal({ user, onClose, onLogout, onLogin }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {user ? (
          <>
            <h2 className="modal-title">Přihlášený uživatel</h2>
            <p className="modal-name">{user.name}</p>
            <p className="modal-email">{user.email}</p>
            <button
              className="modal-button logout"
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              <LogOut size={18} /> Odhlásit se
            </button>
          </>
        ) : (
          <>
            <h2 className="modal-title">Nepřihlášený uživatel</h2>
            <p className="modal-message">Pro přístup ke všem funkcím se přihlaste.</p>
            <button
              className="modal-button login"
              onClick={() => {
                onLogin();
                onClose();
              }}
            >
              <LogIn size={18} /> Přihlásit se
            </button>
          </>
        )}
      </div>
    </div>
  );
}
