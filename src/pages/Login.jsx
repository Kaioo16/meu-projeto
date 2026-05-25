import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      alert(err.code + " - " + err.message);
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Conta criada com sucesso!");
    } catch (err) {
      console.log(err);
      alert(err.code + " - " + err.message);
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email de recuperação enviado!");
    } catch (err) {
      console.log(err);
      alert(err.code + " - " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h1 className="text-4xl font-bold text-center mb-6">
          Conecte-se
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded mb-3"
        >
          Entrar
        </button>

        <button
          onClick={register}
          className="w-full bg-green-600 text-white py-3 rounded mb-3"
        >
          Criar conta
        </button>

        <button
          onClick={resetPassword}
          className="w-full text-blue-600"
        >
          Esqueci minha senha
        </button>
      </div>
    </div>
  );
}
