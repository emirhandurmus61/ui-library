"use client";

import { useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Types & Data ───────────────────────────────────────────── */

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive" | "pending";
  salary: number;
  joined: string;
  projects: { name: string; status: string }[];
}

const EMPLOYEES: Employee[] = [
  {
    id: 1, name: "Emirhan Durmuş", email: "emirhan@example.com",
    department: "Mühendislik", role: "Senior Dev", status: "active",
    salary: 120000, joined: "2022-03-15",
    projects: [{ name: "UI Library", status: "Devam ediyor" }, { name: "API Gateway", status: "Tamamlandı" }],
  },
  {
    id: 2, name: "Ayşe Kaya", email: "ayse@example.com",
    department: "Tasarım", role: "Lead Designer", status: "active",
    salary: 105000, joined: "2022-07-01",
    projects: [{ name: "Design System", status: "Devam ediyor" }],
  },
  {
    id: 3, name: "Mehmet Yılmaz", email: "mehmet@example.com",
    department: "Mühendislik", role: "Backend Dev", status: "inactive",
    salary: 95000, joined: "2023-01-10",
    projects: [],
  },
  {
    id: 4, name: "Zeynep Çelik", email: "zeynep@example.com",
    department: "Ürün", role: "Product Manager", status: "pending",
    salary: 110000, joined: "2024-02-20",
    projects: [{ name: "Mobile App", status: "Planlama" }],
  },
  {
    id: 5, name: "Ali Öztürk", email: "ali@example.com",
    department: "Mühendislik", role: "DevOps", status: "active",
    salary: 98000, joined: "2023-06-05",
    projects: [{ name: "CI/CD Pipeline", status: "Tamamlandı" }, { name: "K8s Migration", status: "Devam ediyor" }],
  },
  {
    id: 6, name: "Fatma Demir", email: "fatma@example.com",
    department: "Pazarlama", role: "Growth Lead", status: "active",
    salary: 88000, joined: "2024-04-12",
    projects: [{ name: "SEO Campaign", status: "Devam ediyor" }],
  },
  {
    id: 7, name: "Can Arslan", email: "can@example.com",
    department: "Tasarım", role: "UI Designer", status: "pending",
    salary: 78000, joined: "2025-01-08",
    projects: [],
  },
];

const statusVariant = {
  active: "success", inactive: "secondary", pending: "warning",
} as const;
const statusLabel = { active: "Aktif", inactive: "Pasif", pending: "Bekliyor" };

/* ─── Columns ────────────────────────────────────────────────── */

function buildColumns(
  onNameEdit: (row: Employee, val: string) => void,
  onRoleEdit: (row: Employee, val: string) => void,
): DataTableColumn<Employee>[] {
  return [
    {
      key: "name",
      header: "Çalışan",
      sortable: true,
      filterable: true,
      rawValue: (r) => r.name,
      accessor: (r) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={r.name} size="sm" />
          <div>
            <p className="font-medium text-foreground leading-tight">{r.name}</p>
            <p className="text-xs text-foreground-muted">{r.email}</p>
          </div>
        </div>
      ),
      editable: true,
      editAccessor: (r) => r.name,
      onEdit: onNameEdit,
    },
    {
      key: "department",
      header: "Departman",
      sortable: true,
      filterable: true,
      rawValue: (r) => r.department,
      accessor: (r) => <span className="text-foreground-muted">{r.department}</span>,
    },
    {
      key: "role",
      header: "Pozisyon",
      sortable: true,
      filterable: true,
      rawValue: (r) => r.role,
      accessor: (r) => r.role,
      editable: true,
      editAccessor: (r) => r.role,
      onEdit: onRoleEdit,
    },
    {
      key: "status",
      header: "Durum",
      sortable: true,
      filterable: true,
      rawValue: (r) => statusLabel[r.status],
      accessor: (r) => (
        <Badge variant={statusVariant[r.status]} size="sm" dot>
          {statusLabel[r.status]}
        </Badge>
      ),
    },
    {
      key: "salary",
      header: "Maaş",
      sortable: true,
      filterable: false,
      align: "right",
      rawValue: (r) => r.salary,
      accessor: (r) => (
        <span className="text-foreground tabular-nums font-medium">
          {r.salary.toLocaleString("tr-TR")} ₺
        </span>
      ),
    },
    {
      key: "joined",
      header: "İşe Giriş",
      sortable: true,
      filterable: false,
      align: "right",
      rawValue: (r) => r.joined,
      accessor: (r) => (
        <span className="text-foreground-muted tabular-nums text-xs">
          {new Date(r.joined).toLocaleDateString("tr-TR")}
        </span>
      ),
    },
  ];
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function DataTableShowcase() {
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

  const handleNameEdit = (row: Employee, val: string) =>
    setEmployees((prev) => prev.map((e) => e.id === row.id ? { ...e, name: val } : e));
  const handleRoleEdit = (row: Employee, val: string) =>
    setEmployees((prev) => prev.map((e) => e.id === row.id ? { ...e, role: val } : e));

  const columns = buildColumns(handleNameEdit, handleRoleEdit);

  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Data Table</h1>
        <p className="text-sm text-foreground-muted">
          Satır seçimi · genişletme · kolon gizleme · satır içi düzenleme · filtreleme · CSV/JSON export
        </p>
      </div>

      {/* Full featured */}
      <ShowcaseSection
        title="Tam Özellikli"
        description="Toolbar: filtre, kolon görünürlüğü, export. Satır seçimi (checkbox). Satır genişletme. Çift tıkla satır içi düzenleme (Ad ve Pozisyon kolonları)."
        code={`<DataTable
  columns={columns}
  data={employees}
  keyExtractor={(r) => r.id}
  selectable
  onSelectionChange={setSelectedKeys}
  expandedRow={(r) => <ExpandedContent row={r} />}
  toolbar
  exportFilename="calisanlar"
/>`}
      >
        <DataTable
          columns={columns}
          data={employees}
          keyExtractor={(r) => r.id}
          selectable
          onSelectionChange={setSelectedKeys}
          expandedRow={(row) => (
            <div>
              <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">Projeler</p>
              {row.projects.length === 0 ? (
                <p className="text-sm text-foreground-muted">Atanmış proje yok.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {row.projects.map((p) => (
                    <div key={p.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-md)] bg-background border border-border text-sm">
                      <span className="font-medium text-foreground">{p.name}</span>
                      <Badge variant={p.status === "Tamamlandı" ? "success" : p.status === "Planlama" ? "warning" : "primary"} size="sm">
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          toolbar
          exportFilename="calisanlar"
        />
        {selectedKeys.length > 0 && (
          <p className="text-xs text-foreground-muted mt-2">
            Seçili ID'ler: {selectedKeys.join(", ")}
          </p>
        )}
      </ShowcaseSection>

      {/* Minimal — no toolbar, no selection */}
      <ShowcaseSection
        title="Minimal"
        description="Toolbar ve seçim olmadan — sadece sıralama ve zebra stripe."
        code={`<DataTable
  columns={columns}
  data={employees}
  keyExtractor={(r) => r.id}
  toolbar={false}
  striped
/>`}
      >
        <DataTable
          columns={columns.slice(0, 4)}
          data={employees}
          keyExtractor={(r) => r.id}
          toolbar={false}
          striped
        />
      </ShowcaseSection>

      {/* Compact + bordered */}
      <ShowcaseSection
        title="Compact + Bordered"
        description="compact ve bordered prop'ları ile sıkıştırılmış görünüm."
        code={`<DataTable columns={columns} data={employees} keyExtractor={(r) => r.id} toolbar={false} compact bordered />`}
      >
        <DataTable
          columns={columns.slice(0, 5)}
          data={employees}
          keyExtractor={(r) => r.id}
          toolbar={false}
          compact
          bordered
        />
      </ShowcaseSection>

      {/* Mobile cards */}
      <ShowcaseSection
        title="Mobil Kart Modu"
        description="mobileCards prop'u ile < sm kırılma noktasında tablo satırları kart görünümüne dönüşür. Masaüstünde yine tablo gösterilir."
        viewportToggle
        code={`<DataTable
  columns={columns}
  data={employees}
  keyExtractor={(r) => r.id}
  mobileCards
  toolbar={false}
/>`}
      >
        <DataTable
          columns={columns.map((c) => ({
            ...c,
            // email ve salary kolonları mobil kart görünümünde gizlenebilir
            mobileHidden: c.key === "joined" || c.key === "salary",
          }))}
          data={employees.slice(0, 4)}
          keyExtractor={(r) => r.id}
          mobileCards
          toolbar={false}
          striped
        />
      </ShowcaseSection>

      {/* Empty state */}
      <ShowcaseSection
        title="Boş Tablo"
        description="data=[] ile boş durum mesajı."
        code={`<DataTable columns={columns} data={[]} keyExtractor={(r) => r.id} emptyText="Çalışan bulunamadı." />`}
      >
        <DataTable
          columns={columns.slice(0, 4)}
          data={[]}
          keyExtractor={(r) => r.id}
          toolbar={false}
          emptyText="Çalışan bulunamadı."
        />
      </ShowcaseSection>
    </div>
  );
}
