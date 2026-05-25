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
  const [filter, setFilter] = useState("todas");
  const [darkMode, setDarkMode] = useState(false);

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
      concluida: false,
      criadaEm: new Date().toLocaleString()
    });

    setTask("");
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
    window.location.reload();
  };

  const toggleTask = async (item) => {
    await updateDoc(doc(db, "tasks", item.id), {
      concluida: !item.concluida
    });
    window.location.reload();
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "pendentes") return !item.concluida;
    if (filter === "concluidas") return item.concluida;
    return true;
  });

  return (
    <div className={darkMode ? "min-h-screen bg-black text-white p-10" : "min-h-screen bg-gray-100 p-10"}>
      <div className={darkMode
  ? "bg-gray-800 text-white p-8 rounded-2xl shadow max-w-xl mx-auto"
  : "bg-white p-8 rounded-2xl shadow max-w-xl mx-auto"}>
      <button
  onClick={() => setDarkMode(!darkMode)}
  className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
>
  {darkMode ? "☀️ Claro" : "🌙 Escuro"}
</button> 
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
         className={darkMode ? "border p-2 w-full mb-3 rounded text-black" : "border p-2 w-full mb-3 rounded"}
          />

        <button
          onClick={saveTask}
          className="bg-green-500 text-white px-6 py-2 rounded-lg mb-4 w-full"
        >
          Salvar tarefa
        </button>

        <h2 className="font-bold mb-2">Minhas tarefas:</h2>

        <div className="mb-4">
          <button
            onClick={() => setFilter("todas")}
            className="mr-2 bg-gray-300 px-2 rounded"
          >
            Todas
          </button>

          <button
            onClick={() => setFilter("pendentes")}
            className="mr-2 bg-yellow-300 px-2 rounded"
          >
            Pendentes
          </button>

          <button
            onClick={() => setFilter("concluidas")}
            className="bg-green-300 px-2 rounded"
          >
            Concluídas
          </button>
        </div>

        <div className="mb-4">
          {filteredTasks.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3"
            >
              {editingId === item.id ? (
                <input
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <div
                  onClick={() => toggleTask(item)}
                  className={item.concluida ? "line-through cursor-pointer" : "cursor-pointer"}
                >
                  <p>
                    {item.concluida ? "☑" : "☐"} {item.texto}
                  </p>
                  <small className="text-gray-500">
                    {item.criadaEm}
                  </small>
                </div>
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
