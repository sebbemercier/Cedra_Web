"use client";

import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Zap,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { AdminSummary, User } from "@/types";
import { StatBox } from "@/components/pages/admin/StatBox";
import { ActionItem } from "@/components/pages/admin/ActionItem";
import { SalesChart } from "@/components/pages/admin/SalesChart";
import { AdminHeader } from "@/components/pages/admin/AdminHeader";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        // Verify admin role first
        const user = await api.auth.me(token);
        setCurrentUser(user);

        if (user.role !== "admin") {
          router.push("/dashboard");
          return;
        }

        const data = await api.admin.getSummary(token);
        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch admin summary", err);
        const e = err as Error;
        setError(e.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-background flex items-center justify-center">
        <div className="text-cedra-500 animate-spin">
          <Zap size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-background flex items-center justify-center">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/20 p-8 rounded-4xl text-center shadow-2xl">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-white font-bold text-xl mb-2">Access Denied</h2>
          <p className="text-red-500/80 text-sm mb-4">{error}</p>

          <div className="bg-black/40 rounded-xl p-4 mb-6 text-left border border-white/5 overflow-auto max-h-40">
            <p className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">
              Raw User Data:
            </p>
            <pre className="text-[10px] text-cedra-500 font-mono">
              {JSON.stringify(currentUser, null, 2)}
            </pre>
          </div>

          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-white text-black hover:bg-zinc-200 w-full rounded-xl font-bold"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatBox
            icon={<DollarSign />}
            label="Total Revenue"
            value={`€${(summary?.total_sales_amount || 0).toLocaleString()}`}
            trend="up"
          />
          <StatBox
            icon={<ShoppingCart />}
            label="Total Orders"
            value={(summary?.total_orders || 0).toString()}
            trend="up"
          />
          <StatBox
            icon={<Users />}
            label="Total Users"
            value={(summary?.total_users || 0).toString()}
            trend="stable"
          />
          <StatBox
            icon={<AlertTriangle />}
            label="Low Stock Items"
            value={(summary?.products_low_stock || 0).toString()}
            trend={(summary?.products_low_stock || 0) > 0 ? "down" : "stable"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SalesChart summary={summary} />

          <div className="space-y-6">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
              <Zap className="text-cedra-500" />
              System Health & Alerts
            </h3>

            {(summary?.products_low_stock || 0) > 0 && (
              <ActionItem
                title="Low Stock Alert"
                desc={`${summary?.products_low_stock} products are below their safety stock threshold. Replenishment recommended.`}
                severity="high"
              />
            )}

            {(summary?.pending_orders || 0) > 0 && (
              <ActionItem
                title="Pending Orders"
                desc={`${summary?.pending_orders} orders are awaiting processing or payment.`}
                severity="medium"
              />
            )}

            {(summary?.recent_fraud_alerts || 0) > 0 && (
              <ActionItem
                title="Fraud Alerts Detected"
                desc={`${summary?.recent_fraud_alerts} suspicious transactions flagged by AI.`}
                severity="high"
              />
            )}

            <ActionItem
              title="System Status"
              desc="All systems operational. AI Inference Engine running on GPU."
              severity="low"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
