"use client";

import { useState } from "react";
import { Table, type TableColumn } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joined: string;
}

const USERS: User[] = [
  { id: 1, name: "Emirhan Durmuş", email: "emirhan@example.com", role: "Admin", status: "active", joined: "2024-01-15" },
  { id: 2, name: "Ayşe Kaya",       email: "ayse@example.com",    role: "Editor", status: "active", joined: "2024-03-22" },
  { id: 3, name: "Mehmet Yılmaz",   email: "mehmet@example.com",  role: "Viewer", status: "inactive", joined: "2024-05-10" },
  { id: 4, name: "Zeynep Çelik",    email: "zeynep@example.com",  role: "Editor", status: "pending", joined: "2025-01-08" },
  { id: 5, name: "Ali Öztürk",      email: "ali@example.com",     role: "Viewer", status: "active", joined: "2025-03-30" },
];

const statusVariant = {
  active:   "success",
  inactive: "secondary",
  pending:  "warning",
} as const;

const statusLabel = { active: "Aktif", inactive: "Pasif", pending: "Bekliyor" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function TableShowcase() {
  const [selected, setSelected] = useState<User | null>(null);

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      header: "Kullanıcı",
      sortable: true,
      accessor: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-foreground">{row.name}</p>
            <p className="text-xs text-foreground-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Rol",
      sortable: true,
      accessor: (row) => <span className="text-foreground-muted">{row.role}</span>,
    },
    {
      key: "status",
      header: "Durum",
      sortable: true,
      accessor: (row) => (
        <Badge variant={statusVariant[row.status]} size="sm" dot>
          {statusLabel[row.status]}
        </Badge>
      ),
    },
    {
      key: "joined",
      header: "Katılım",
      sortable: true,
      align: "right",
      accessor: (row) => (
        <span className="text-foreground-muted tabular-nums">
          {new Date(row.joined).toLocaleDateString("tr-TR")}
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Table</h1>
        <p className="text-foreground-muted">
          sortable headers · striped · hoverable · bordered · compact · row click · responsive scroll
        </p>
      </div>

      <Section title="Temel (Sortable)">
        <Table
          columns={columns}
          data={USERS}
          keyExtractor={(r) => r.id}
        />
      </Section>

      <Section title="Striped + Row Click">
        {selected && (
          <p className="text-sm text-foreground-muted mb-3">
            Seçilen: <strong className="text-foreground">{selected.name}</strong>
          </p>
        )}
        <Table
          columns={columns}
          data={USERS}
          keyExtractor={(r) => r.id}
          striped
          onRowClick={setSelected}
        />
      </Section>

      <Section title="Compact + Bordered">
        <Table
          columns={columns.slice(0, 3)}
          data={USERS}
          keyExtractor={(r) => r.id}
          compact
          bordered
        />
      </Section>

      <Section title="Boş Tablo">
        <Table
          columns={columns}
          data={[]}
          keyExtractor={(r) => r.id}
          emptyText="Henüz kullanıcı eklenmedi."
        />
      </Section>
    </div>
  );
}
