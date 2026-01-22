"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea, Avatar, TextInput, ActionIcon, Paper, Text, Group, Stack, Badge } from "@mantine/core";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function MantineChat() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Bonjour ! Je suis l'IA experte de Cedra. Comment puis-je vous aider dans votre projet électrique ?" }
  ]);
  const [input, setInput] = useState("");
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: "Analyse des spécifications techniques en cours... Un de nos ingénieurs peut également prendre le relais si besoin." 
      }]);
    }, 800);
  };

  return (
    <Paper shadow="2xl" radius="24px" p="xl" withBorder className="bg-zinc-900/40 backdrop-blur-2xl border-white/5 max-w-2xl mx-auto shadow-red-900/10">
      <Group justify="space-between" mb="xl">
        <Group>
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
            <Bot color="white" size={22} />
          </div>
          <div>
            <Text fw={900} size="sm" className="uppercase tracking-widest text-white">Assistant IA</Text>
            <Badge color="green" variant="dot" size="xs" className="opacity-80">En ligne</Badge>
          </div>
        </Group>
        <Sparkles size={18} className="text-red-500 animate-pulse" />
      </Group>

      <ScrollArea h={350} viewportRef={viewport} scrollbarSize={4}>
        <Stack gap="lg" pr="md">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar 
                  size="sm" 
                  radius="md" 
                  color={m.role === "assistant" ? "red" : "gray"}
                  className="mt-1 shadow-md"
                />
                <Paper 
                  p="sm" 
                  radius="lg" 
                  className={m.role === "user" 
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/10" 
                    : "bg-white/5 text-zinc-200 border border-white/5"}
                >
                  <Text size="xs" fw={500} className="leading-relaxed">{m.content}</Text>
                </Paper>
              </div>
            </div>
          ))}
        </Stack>
      </ScrollArea>

      <div className="mt-8 pt-6 border-t border-white/5">
        <Group gap="xs">
          <TextInput 
            placeholder="Posez votre question (ex: section de câble, disjoncteurs...)" 
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            variant="unstyled"
            styles={{ input: { 
              backgroundColor: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.08)", 
              color: "white",
              height: "50px",
              padding: "0 20px",
              borderRadius: "16px",
              fontSize: "13px"
            } }}
          />
          <ActionIcon 
            size="50px" 
            radius="16px" 
            variant="filled" 
            color="red"
            onClick={handleSend}
            className="hover:scale-105 transition-transform"
          >
            <Send size={20} />
          </ActionIcon>
        </Group>
      </div>
    </Paper>
  );
}