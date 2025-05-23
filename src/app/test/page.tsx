"use client";

import { useMemo, useState } from "react";
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
import { Filter, UserPlus, ChevronDown, ChevronUp } from "lucide-react";
import Star from "@/components/ui/star";

// Tipo de dados para os alunos
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

export default function Component() {
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
      period: "5º",
      project: "Não",
      joined: "2023-02-10",
      rating: 4,
    },
    {
      id: 3,
      username: "Emanuele",
      email: "emanu@edge.ufal.br",
      course: "Ciência da Computação",
      turma: "2",
      period: "4º",
      project: "Sim",
      joined: "2022-08-18",
      rating: 3,
    },
    {
      id: 4,
      username: "Joao",
      email: "joao@edge.ufal.br",
      course: "Ciência da Computação",
      turma: "1",
      period: "5º",
      project: "Sim",
      joined: "2021-11-01",
      rating: 4,
    },
    {
      id: 5,
      username: "Rayssa",
      email: "rayssa@edge.ufal.br",
      course: "Ciência da Computação",
      turma: "3",
      period: "6º",
      project: "Não",
      joined: "2023-04-12",
      rating: 3,
    },
    {
      id: 6,
      username: "Ricardo",
      email: "ricardo@edge.ufal.br",
      course: "Ciência da Computação",
      turma: "2",
      period: "5º",
      project: "Sim",
      joined: "2020-09-25",
      rating: 2,
    },
    {
      id: 7,
      username: "Samuel",
      email: "samuel@edge.ufal.br",
      course: "Ciência da Computação",
      turma: "1",
      period: "3º",
      project: "Sim",
      joined: "2024-01-10",
      rating: 5,
    },
    {
      id: 8,
      username: "Ana",
      email: "ana@edge.ufal.br",
      course: "Engenharia da Computação",
      turma: "4",
      period: "6º",
      project: "Não",
      joined: "2023-06-01",
      rating: 3,
    },
    {
      id: 9,
      username: "Luana",
      email: "luana@edge.ufal.br",
      course: "Engenharia da Computação",
      turma: "3",
      period: "4º",
      project: "Sim",
      joined: "2022-10-20",
      rating: 4,
    },
    {
      id: 10,
      username: "Carlos",
      email: "carlos@edge.ufal.br",
      course: "Engenharia da Computação",
      turma: "2",
      period: "5º",
      project: "Sim",
      joined: "2023-03-15",
      rating: 5,
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>("username");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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

  return (
    <div className="mx-auto my-6 w-full max-w-6xl rounded-xl border bg-white p-6 shadow-sm">
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
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Adicionar alunos
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              ["username", "Nome"],
              ["course", "Curso"],
              ["turma", "Turma"],
              ["period", "Período"],
              ["project", "Projeto"],
              ["joined", "Chegou em"],
            ].map(([key, label]) => (
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
                    <AvatarImage
                      src={`/avatars/${user.username.toLowerCase()}.jpg`}
                    />
                    <AvatarFallback>
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.course}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.turma}</Badge>
              </TableCell>
              <TableCell>{user.period}</TableCell>
              <TableCell>
                <Badge
                  variant={user.project === "Sim" ? "default" : "outline"}
                >
                  {user.project}
                </Badge>
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
  );
}