"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "@/services/user.service";
import { toast } from "sonner";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  isActive?: boolean;
};

export default function UserStatsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 📊 STATS CALCULATION
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.isActive !== false).length;
    const blocked = users.filter((u) => u.isActive === false).length;
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const members = users.filter((u) => u.role === "MEMBER").length;

    return { total, active, blocked, admins, members };
  }, [users]);

  // 📊 ROLE PIE
  const roleData = [
    { name: "Admins", value: stats.admins },
    { name: "Members", value: stats.members },
  ];

  // 📊 STATUS PIE
  const statusData = [
    { name: "Active", value: stats.active },
    { name: "Blocked", value: stats.blocked },
  ];

  // 📊 BAR DATA
  const barData = [
    { name: "Users", value: stats.total },
    { name: "Active", value: stats.active },
    { name: "Blocked", value: stats.blocked },
    { name: "Admins", value: stats.admins },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b"];

  if (loading) return <p className="p-6">Loading stats...</p>;

  return (
    <div className="w-11/12 mx-auto py-8 space-y-10">

      {/* 🌟 KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">Active</p>
          <h2 className="text-2xl font-bold text-green-500">
            {stats.active}
          </h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">Blocked</p>
          <h2 className="text-2xl font-bold text-red-500">
            {stats.blocked}
          </h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">Admins</p>
          <h2 className="text-2xl font-bold text-blue-500">
            {stats.admins}
          </h2>
        </div>

      </div>

      {/* 📊 CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ROLE CHART */}
        <div className="border rounded-2xl p-4 h-[300px]">
          <h2 className="font-semibold mb-2">User Roles</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={roleData} dataKey="value">
                {roleData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* STATUS CHART */}
        <div className="border rounded-2xl p-4 h-[300px]">
          <h2 className="font-semibold mb-2">User Status</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusData} dataKey="value">
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i + 2]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="border rounded-2xl p-4 h-[300px]">
          <h2 className="font-semibold mb-2">Overview</h2>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}