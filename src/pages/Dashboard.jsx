import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

export default function Dashboard({ user }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          nome: "Kaio"
        });

        const querySnapshot = await getDocs(collection(db, "tasks"));
        const lista = [];

        querySnapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setTasks(lista);
      }
    };

    loadData();
  }, [user]);

  const saveTask = async () => {
    if (!task) return;

    await addDoc(collection(db, "tasks"), {
      texto: task,
      userId: user.uid,
      concluida: false
    });

    alert("Tarefa salva!");
    window.location.reload();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const editTask = async (id) => {
    await updateDoc(doc(db, "tasks", id), {
      texto: newText
    });

    alert("Tarefa editada!");
    window.location.reload();
  };

  const toggleTask = async (item) => {
    await updateDoc(doc(db, "tasks", item.id), {
      concluida: !item.concluida
    });

    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white p-8 rounded-2xl shadow max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Kaio App
        </h1>

        <p className="text-lg mb-6">
          Bem-vindo <strong>{user?.email}</strong>
        </p>

        <input
          type="text"
          placeholder="Digite uma tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={saveTask}
          className="bg-green-500 text-white px-6 py-2 rounded-lg mb-4 w-full"
        >
          Salvar tarefa
        </button>

        <div className="mb-4">
          <h2 className="font-bold mb-2">Minhas tarefas:</h2>

          {tasks.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              {editingId === item.id ? (
                <input
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <p
                  onClick={() => toggleTask(item)}
                  className={item.concluida ? "line-through cursor-pointer" : "cursor-pointer"}
                >
                  {item.concluida ? "☑" : "☐"} {item.texto}
                </p>
              )}

              <div>
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setNewText(item.texto);
                  }}
                  className="text-blue-500 mr-2"
                >
                  Editar
                </button>

                {editingId === item.id && (
                  <button
                    onClick={() => editTask(item.id)}
                    className="text-green-500 mr-2"
                  >
                    Salvar
                  </button>
                )}

                <button
                  onClick={() => deleteTask(item.id)}
                  className="text-red-500"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg w-full"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
