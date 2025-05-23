"use client";

import {
  LayoutDashboard,
  Users,
  User,
  LogOut,
  ChevronDown,
  Filter,
  UserPlus,
  ChevronUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Star from "@/components/ui/star";

type User = {
  id: number;
  username: string;
  email: string;
  course: string;
  turma: string;
  period: string;
  project: string;
  joined: string;
  rating: number;
};

type SortColumn = keyof Omit<User, "id" | "rating">;

export default function DashboardPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [users] = useState<User[]>([
    {
      id: 1,
      username: "Christian",
      email: "chris@edge.ufal.br",
      course: "Engenharia da Computação",
      turma: "2",
      period: "5º",
      project: "Sim",
      joined: "2024-03-15",
      rating: 5,
    },
    {
  id: 2,
  username: "Beatriz",
  email: "beatriz@edge.ufal.br",
  course: "Ciência da Computação",
  turma: "1",
  period: "4º",
  project: "Sim",
  joined: "2023-11-22",
  rating: 4,
},
{
  id: 3,
  username: "Emanuele",
  email: "emanu@edge.ufal.br",
  course: "Ciência da Computação",
  turma: "3",
  period: "6º",
  project: "Não",
  joined: "2022-09-12",
  rating: 3,
},
{
  id: 4,
  username: "Joao",
  email: "joao@edge.ufal.br",
  course: "Engenharia da Computação",
  turma: "2",
  period: "5º",
  project: "Sim",
  joined: "2021-08-10",
  rating: 5,
},
{
  id: 5,
  username: "Luana",
  email: "luana@edge.ufal.br",
  course: "Ciência da Computação",
  turma: "1",
  period: "3º",
  project: "Não",
  joined: "2024-01-05",
  rating: 2,
},
{
  id: 6,
  username: "Carlos",
  email: "carlos@edge.ufal.br",
  course: "Engenharia da Computação",
  turma: "4",
  period: "7º",
  project: "Sim",
  joined: "2023-04-20",
  rating: 4,
},
{
  id: 7,
  username: "Rayssa",
  email: "rayssa@edge.ufal.br",
  course: "Engenharia da Computação",
  turma: "3",
  period: "6º",
  project: "Sim",
  joined: "2022-07-18",
  rating: 5,
},
{
  id: 8,
  username: "Samuel",
  email: "samuel@edge.ufal.br",
  course: "Ciência da Computação",
  turma: "2",
  period: "4º",
  project: "Não",
  joined: "2021-10-01",
  rating: 3,
},
{
  id: 9,
  username: "Ana",
  email: "ana@edge.ufal.br",
  course: "Engenharia da Computação",
  turma: "1",
  period: "2º",
  project: "Sim",
  joined: "2023-05-10",
  rating: 4,
},
{
  id: 10,
  username: "Ricardo",
  email: "ricardo@edge.ufal.br",
  course: "Ciência da Computação",
  turma: "2",
  period: "5º",
  project: "Não",
  joined: "2020-09-17",
  rating: 2,
},

  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>("username");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleSubmenu = (key: string) => {
    setOpen(open === key ? null : key);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (a[sortColumn]! < b[sortColumn]!)
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn]! > b[sortColumn]!)
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const columnLabels: Record<string, string> = {
    username: "Nome",
    course: "Curso",
    turma: "Turma",
    period: "Período",
    project: "Projeto",
    joined: "Chegou em",
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#d9f2ff" }}>
      <aside className="w-64 text-[#173c6b] flex flex-col justify-between px-4 py-6" style={{ backgroundColor: "#d9f2ff" }}>
        <div>
          <div className="flex items-center justify-center mb-8">
            <img src="/logo-edge.png" alt="Edge Academy" className="h-12 mx-auto" />
          </div>
          <nav className="space-y-2">
            <Link href="#" className="flex items-center gap-2 font-medium hover:text-blue-700">
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </Link>
            <button
              onClick={() => toggleSubmenu("alunos")}
              className="flex items-center justify-between w-full font-medium hover:text-blue-700"
            >
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Alunos
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${open === "alunos" ? "rotate-180" : "rotate-0"}`}
              />
            </button>
            {open === "alunos" && (
              <div className="ml-6 mt-2 space-y-1 text-sm">
                <Link href="#" className="block hover:text-blue-700">Listagem</Link>
                <Link href="#" className="block hover:text-blue-700">Acompanhamento de cadastro</Link>
                <Link href="#" className="block hover:text-blue-700">Pedido de edição de dados</Link>
              </div>
            )}
            <Link href="#" className="flex items-center gap-2 font-medium hover:text-blue-700">
              <User className="h-5 w-5" /> Usuários
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <Link href="#" className="flex items-center gap-2 font-medium hover:text-blue-700">
            <User className="h-5 w-5" /> Perfil
          </Link>
          <Link href="#" className="flex items-center gap-2 font-medium hover:text-red-600">
            <LogOut className="h-5 w-5" /> Sair
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 text-black">
        <div className="mx-5 w-[calc(100%-80px)] rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <Input
              placeholder="Buscar por um aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-96"
            />
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </Button>
              <Button className="bg-[#173c6b] text-white hover:bg-[#132f55]">
  <UserPlus className="mr-2 h-4 w-4 text-white" />
  Adicionar alunos
</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {Object.entries(columnLabels).map(([key, label]) => (
                  <TableHead
                    key={key}
                    className="cursor-pointer select-none"
                    onClick={() => handleSort(key as SortColumn)}
                  >
                    {label}
                    {sortColumn === key && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="ml-1 inline h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 inline h-4 w-4" />
                      )
                    )}
                  </TableHead>
                ))}
                <TableHead>Desempenho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/avatars/${user.username.toLowerCase()}.jpg`} />
                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.username}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.course}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.turma}</Badge>
                  </TableCell>
                  <TableCell>{user.period}</TableCell>
                  <TableCell>
                    <Badge variant={user.project === "Sim" ? "default" : "outline"}>{user.project}</Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} rating={n} filled={n <= user.rating} />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
