"use client";

import { getIdeas } from "@/services/idea2.service";
import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Idea = {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  price?: number;
  status: "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  author: {
    name: string;
    email: string;
  };
  category: {
    name: string;
    id: string;
  };
  votes: {
    type: "UP" | "DOWN";
  }[];
};

export default function IdeaPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllIdeas = async () => {
      try {
        const data = await getIdeas()

        
        setIdeas(data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllIdeas();
  }, []);

  // 📊 CATEGORY DATA
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};

    ideas.forEach((idea) => {
      const cat = idea.category?.name || "Unknown";
      map[cat] = (map[cat] || 0) + 1;
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [ideas]);

  // 📊 STATUS DATA
  const statusData = useMemo(() => {
    const map = {
      APPROVED: 0,
      UNDER_REVIEW: 0,
      REJECTED: 0,
    };

    ideas.forEach((i) => map[i.status]++);

    return [
      { name: "Approved", value: map.APPROVED },
      { name: "Pending", value: map.UNDER_REVIEW },
      { name: "Rejected", value: map.REJECTED },
    ];
  }, [ideas]);

  // 💰 PAID VS FREE
  const paidData = useMemo(() => {
    let paid = 0;
    let free = 0;

    ideas.forEach((i) => {
      i.isPaid ? paid++ : free++;
    });

    return [
      { name: "Paid", value: paid },
      { name: "Free", value: free },
    ];
  }, [ideas]);

  // 👍 VOTES
  const voteData = useMemo(() => {
    let up = 0;
    let down = 0;

    ideas.forEach((idea) => {
      idea.votes.forEach((v) => {
        v.type === "UP" ? up++ : down++;
      });
    });

    return [
      { name: "Upvotes", value: up },
      { name: "Downvotes", value: down },
    ];
  }, [ideas]);

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="w-11/12 mx-auto py-6 space-y-10">

      {/* 📊 KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-xl">
          <p>Total Ideas</p>
          <h2 className="text-2xl font-bold">{ideas.length}</h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p>Approved</p>
          <h2 className="text-2xl font-bold text-green-500">
            {statusData[0].value}
          </h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p>Pending</p>
          <h2 className="text-2xl font-bold text-yellow-500">
            {statusData[1].value}
          </h2>
        </div>

        <div className="p-4 border rounded-xl">
          <p>Rejected</p>
          <h2 className="text-2xl font-bold text-red-500">
            {statusData[2].value}
          </h2>
        </div>
      </div>

      {/* 📊 CATEGORY CHART */}
      <div className="border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Ideas per Category</h2>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📊 PIE CHARTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* STATUS */}
        <div className="border rounded-2xl p-4 h-[300px]">
          <h2 className="font-semibold mb-2">Idea Status</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusData} dataKey="value">
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* PAID VS FREE */}
        <div className="border rounded-2xl p-4 h-[300px]">
          <h2 className="font-semibold mb-2">Paid vs Free</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={paidData} dataKey="value">
                {paidData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* VOTES */}
        <div className="border rounded-2xl p-4 h-[300px]">
          <h2 className="font-semibold mb-2">Votes</h2>
          <ResponsiveContainer>
            <BarChart data={voteData}>
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