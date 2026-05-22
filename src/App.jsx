import { Home, User, Settings, Bell } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { mes: "Jan", vendas: 4000 },
  { mes: "Fev", vendas: 3000 },
  { mes: "Mar", vendas: 5000 },
  { mes: "Abr", vendas: 4500 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-lg p-5">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">Kaio App</h1>

        <nav className="space-y-4">
          <div className="flex gap-2 p-3 hover:bg-blue-50 rounded-lg"><Home size={20}/>Dashboard</div>
          <div className="flex gap-2 p-3 hover:bg-blue-50 rounded-lg"><User size={20}/>Perfil</div>
          <div className="flex gap-2 p-3 hover:bg-blue-50 rounded-lg"><Settings size={20}/>Configurações</div>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <Bell />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            ["Usuários","120"],
            ["Vendas","R$ 8.500"],
            ["Pedidos","34"]
          ].map((item,i)=>(
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h3>{item[0]}</h3>
              <p className="text-3xl font-bold">{item[1]}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold mb-4">Vendas Mensais</h3>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="vendas" />
          </LineChart>
        </div>
      </main>
    </div>
  )
}
