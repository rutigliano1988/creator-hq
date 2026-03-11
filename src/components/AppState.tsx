"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  channels as initialChannels,
  upcomingPublications as initialUpcoming,
  urgentTasks as initialTasks,
  initialIdeas,
  type Channel,
  type Publication,
  type Task,
  type Idea,
} from "@/lib/mockData";

type AppState = {
  channels: Channel[];
  upcomingPublications: Publication[];
  urgentTasks: Task[];
  ideas: Idea[];
  addTask: (text: string) => void;
  addIdea: (title: string, channelId: string) => void;
  moveIdea: (id: string, status: Idea["status"]) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [channels] = useState<Channel[]>(initialChannels);
  const [upcomingPublications] = useState<Publication[]>(initialUpcoming);
  const [urgentTasks, setUrgentTasks] = useState<Task[]>(initialTasks);
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);

  const addTask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: `t_${Date.now()}`,
      text: trimmed,
      urgent: true,
      done: false,
    };

    setUrgentTasks((prev) => [newTask, ...prev]);
  };

  const addIdea = (title: string, channelId: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newIdea: Idea = {
      id: `i_${Date.now()}`,
      title: trimmed,
      channelId: channelId || "s1",
      status: "SAVED",
      createdAt: Date.now(),
    };

    setIdeas((prev) => [newIdea, ...prev]);
  };

  const moveIdea = (id: string, status: Idea["status"]) => {
    setIdeas((prev) => prev.map((idea) => (idea.id === id ? { ...idea, status } : idea)));
  };

  const value = useMemo(
    () => ({
      channels,
      upcomingPublications,
      urgentTasks,
      ideas,
      addTask,
      addIdea,
      moveIdea,
    }),
    [channels, upcomingPublications, urgentTasks, ideas]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}