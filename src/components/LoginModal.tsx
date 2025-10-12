import React, { useState } from "react";
import "./LoginModal.css";

type LoginModalProps = {
  onClose: () => void;
  onLogin: (userData: { email: string }) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "demo@user.cz" && password === "heslo123") {
      onLogin({ email });
      onClose();
    } else {
      alert("Neplatné přihlašovací údaje");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h2>Přihlášení</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="submit-button" type="submit">Přihlásit se</button>
        </form>
      
      </div>
    </div>
  );
};

export default LoginModal;
