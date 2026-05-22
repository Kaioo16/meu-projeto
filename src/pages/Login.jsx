import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (email && senha) {
      localStorage.setItem("user", email);
      onLogin(email);
    } else {
      alert("Preencha os campos");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(15px)",
  padding: 30,
  borderRadius: 20,
  width: 320,
  color: "#fff",
  textAlign: "center",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
},
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "none",
  },
  button: {
  padding: 12,
  borderRadius: 8,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontSize: 16,
  cursor: "pointer",
},
