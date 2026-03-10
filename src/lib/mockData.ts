export type Channel = {
  id: string;
  name: string;
  badge: string;
};

export type Publication = {
  id: string;
  title: string;
  channelId: string;
  dayLabel: string; // "Jue"
  timeLabel: string; // "20:00"
  durationLabel?: string; // "3H"
};

export type Task = {
  id: string;
  text: string;
  urgent?: boolean;
  done?: boolean;
};

export const channels: Channel[] = [
  { id: "s1", name: "Serenidad Profunda", badge: "S1" },
  { id: "s2", name: "Arte de Vivir Mejor", badge: "S2" },
  { id: "s3", name: "Kira y su Mundo", badge: "S3" },
];

export const upcomingPublications: Publication[] = [
  {
    id: "p1",
    title: "Lluvia Suave para Dormir",
    channelId: "s1",
    dayLabel: "Jue",
    timeLabel: "20:00",
    durationLabel: "3H",
  },
  {
    id: "p2",
    title: "Tu jefe tóxico no tiene poder sobre ti",
    channelId: "s2",
    dayLabel: "Vie",
    timeLabel: "19:00",
  },
];

export const urgentTasks: Task[] = [
  { id: "t1", text: "Crear cuenta en ElevenLabs y configurar voz de Kira", urgent: true },
  { id: "t2", text: "Subir banner de Serenidad Profunda a YouTube", urgent: true },
  { id: "t3", text: "Instalar Audacity y hacer primer test de loop", urgent: true },
  { id: "t4", text: "Crear canal de YouTube para Serenidad Profunda", urgent: true },
];

export function getDashboardStats() {
  return {
    publishedVideos: 0,
    inProductionThisWeek: 5,
    savedIdeas: 8,
    nextPublication: "Pendiente",
  };
}

export function channelName(channelId: string) {
  return channels.find((c) => c.id === channelId)?.name ?? "Canal";
}