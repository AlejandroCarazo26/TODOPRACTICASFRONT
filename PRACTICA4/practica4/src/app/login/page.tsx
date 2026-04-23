"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "../lib/api/api";


export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(loginData.email, loginData.password);
      if (data.token) {
        document.cookie = `token=${data.token}; path=/`;
        router.push("/");
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch {
      setError("Error al conectar con el servidor");
    }
    setLoading(false);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await register(
        registerData.username,
        registerData.email,
        registerData.password
      );
      if (data.token) {
        document.cookie = `token=${data.token}; path=/`;
        router.push("/");
      } else {
        setError(data.message || "Error al registrarse");
      }
    } catch {
      setError("Error al conectar con el servidor");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          border: "1px solid #e1e8ed",
        }}
      >
        <h1 style={{ marginBottom: 24, fontSize: 24, fontWeight: 700 }}>
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </h1>

        {error && (
          <p
            style={{
              color: "#f4212e",
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {error}
          </p>
        )}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600 }}>
                Email
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600 }}>
                Contraseña
              </label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                style={inputStyle}
              />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? "Cargando..." : "Entrar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600 }}>
                Username
              </label>
              <input
                type="text"
                required
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600 }}>
                Email
              </label>
              <input
                type="email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 600 }}>
                Contraseña
              </label>
              <input
                type="password"
                required
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                style={inputStyle}
              />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? "Cargando..." : "Registrarse"}
            </button>
          </form>
        )}

        <button
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
          style={{
            marginTop: 16,
            background: "none",
            border: "none",
            color: "#1d9bf0",
            cursor: "pointer",
            fontSize: 14,
            width: "100%",
          }}
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e1e8ed",
  borderRadius: 8,
  fontSize: 15,
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "#1d9bf0",
  color: "#fff",
  border: "none",
  borderRadius: 24,
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};