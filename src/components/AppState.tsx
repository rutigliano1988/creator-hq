"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  channels as initialChannels,
  upcomingPublications as initialUpcoming,
  urgentTasks as initialTasks,
  type Channel,
  type Publication,
  type Task,
} from "@/lib/mockData";

type AppState = {
  channels: Channel[];
  upcomingPublications: Publication[];
  urgentTasks: Task[];
  addTask: (text: string) => void;
  addIdea: (title: string) => void; // por ahora solo incrementa contador
  savedIdeasCount: number;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [channels] = useState<Channel[]>(initialChannels);
  const [upcomingPublications] = useState<Publication[]>(initialUpcoming);
  const [urgentTasks, setUrgentTasks] = useState<Task[]>(initialTasks);
  const [savedIdeasCount, setSavedIdeasCount] = useState<number>(8);

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

  const addIdea = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    // De momento: solo actualizamos el contador.
    // En el siguiente paso crearemos una lista real de ideas.
    setSavedIdeasCount((n) => n + 1);
  };

  const value = useMemo(
    () => ({
      channels,
      upcomingPublications,
      urgentTasks,
      addTask,
      addIdea,
      savedIdeasCount,
    }),
    [channels, upcomingPublications, urgentTasks, savedIdeasCount]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}