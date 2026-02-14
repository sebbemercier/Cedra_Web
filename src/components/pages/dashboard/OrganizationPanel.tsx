import React, { useState } from "react";
import { Building2, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { api } from "@/lib/api";

interface OrganizationPanelProps {
  user: User;
  companyUsers: User[];
  onRemoveUser: (userId: string) => void;
  onRefreshUsers: (users: User[]) => void;
}

export function OrganizationPanel({
  user,
  companyUsers,
  onRemoveUser,
  onRefreshUsers,
}: OrganizationPanelProps) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("buyer");

  const handleInvite = async () => {
    const token = localStorage.getItem("token");
    if (token && user.company_id && inviteEmail) {
      try {
        await api.companies.inviteUser(token, user.company_id, {
          email: inviteEmail,
          role: inviteRole as any,
        });
        alert("Invitation envoyée !");
        setInviteEmail("");
        const updatedUsers = await api.companies.getUsers(
          token,
          user.company_id,
        );
        onRefreshUsers(updatedUsers);
      } catch (e) {
        alert("Erreur d'invitation");
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-zinc-900/20 rounded-[2.5rem] border border-white/5 p-8 backdrop-blur-3xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <Building2 className="text-cedra-500" />
        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter font-display">
          Organisation
        </h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
            Inviter un collaborateur
          </Label>
          <div className="flex flex-col gap-3">
            <Input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="email@entreprise.com"
              className="bg-white/5 border-white/5 h-12 rounded-xl focus:border-cedra-500/50"
            />
            <div className="flex gap-2">
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="flex-1 bg-zinc-950/50 border border-white/5 rounded-xl px-4 text-xs font-bold text-white uppercase tracking-widest outline-none focus:border-cedra-500/50"
              >
                <option value="buyer">Buyer</option>
                <option value="viewer">Viewer</option>
              </select>
              <Button
                onClick={handleInvite}
                className="bg-cedra-500 text-white rounded-xl h-12 px-6"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <h4 className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-6">
            Membres de l&apos;équipe ({companyUsers.length})
          </h4>
          <div className="space-y-4">
            {companyUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between group"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white truncate max-w-[150px]">
                    {u.name || u.email}
                  </span>
                  <span className="text-[9px] font-black text-cedra-500 uppercase tracking-widest">
                    {u.role}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveUser(u.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-zinc-700 hover:text-red-500 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
