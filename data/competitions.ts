import { Competition } from "@/types/competition";

export const competitions: Competition[] = [
  {
    id: "1",
    title: "CodeSprint 2025",
    organizer: "TechNova",
    category: "Coding",
    mode: "Online",
    prize: "₹1,000",
    deadline: "25 Sep 2025",
    daysLeft: "Ends in 10 days",
    description:
      "Build innovative solutions to real-world problems and compete with talented students.",
    icon: "code",
  },
  {
    id: "2",
    title: "DesignSphere Challenge",
    organizer: "Creative Minds",
    category: "Design",
    mode: "Online",
    prize: "₹75,000",
    deadline: "30 Sep 2025",
    daysLeft: "Ends in 15 days",
    description:
      "Showcase your creativity and solve exciting design challenges.",
    icon: "design",
  },
  {
    id: "3",
    title: "BizSpark Case Competition",
    organizer: "Future Leaders",
    category: "Business",
    mode: "Hybrid",
    prize: "₹50,000",
    deadline: "05 Oct 2025",
    daysLeft: "Ends in 20 days",
    description:
      "Solve real business problems and present your ideas to industry experts.",
    icon: "business",
  },
];