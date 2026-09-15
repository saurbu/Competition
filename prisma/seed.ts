import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  CompetitionCategory,
  CompetitionMode,
  CompetitionStatus,
} from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const competitions = [
  {
    title: "CodeSprint India 2026",
    slug: "codesprint-india-2026",
    organizer: "TechNova",
    shortDescription:
      "Build innovative software solutions and compete with talented developers.",
    description:
      "CodeSprint India 2026 is a coding competition designed for students and developers to solve real-world technical challenges.",
    about:
      "Participants will work on programming challenges covering algorithms, problem solving, web development, and emerging technologies.",
    category: CompetitionCategory.CODING,
    mode: CompetitionMode.ONLINE,
    registrationStart: new Date("2026-09-01"),
    registrationDeadline: new Date("2026-10-05"),
    competitionStart: new Date("2026-10-10"),
    competitionEnd: new Date("2026-10-11"),
    prizePool: 100000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      { position: "1st", amount: 50000, description: "Winner prize" },
      { position: "2nd", amount: 30000, description: "Runner-up prize" },
      {
        position: "3rd",
        amount: 20000,
        description: "Second runner-up prize",
      },
    ],
    eligibility: [
      "Students and recent graduates can participate.",
      "Participants must have basic programming knowledge.",
      "Open to participants across India.",
    ],
    rules: [
      "Participants must submit their solution before the deadline.",
      "Plagiarism will result in disqualification.",
      "Each participant must use their own work.",
    ],
    instructions: [
      "Register for the competition.",
      "Complete the assigned coding challenges.",
      "Submit your final solution through the competition portal.",
    ],
  },
  {
    title: "DesignSphere Challenge 2026",
    slug: "designsphere-challenge-2026",
    organizer: "Creative Minds",
    shortDescription:
      "Showcase your creativity by solving an exciting real-world design problem.",
    description:
      "DesignSphere Challenge 2026 invites students to create thoughtful and impactful digital experiences.",
    about:
      "Participants will explore user experience, interface design, visual communication, and product thinking.",
    category: CompetitionCategory.DESIGN,
    mode: CompetitionMode.ONLINE,
    registrationStart: new Date("2026-09-05"),
    registrationDeadline: new Date("2026-10-12"),
    competitionStart: new Date("2026-10-15"),
    competitionEnd: new Date("2026-10-20"),
    prizePool: 75000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      { position: "1st", amount: 40000, description: "Winner prize" },
      { position: "2nd", amount: 20000, description: "Runner-up prize" },
      {
        position: "3rd",
        amount: 15000,
        description: "Second runner-up prize",
      },
    ],
    eligibility: [
      "Open to college students.",
      "Participants can participate individually.",
      "Basic knowledge of UI/UX design is recommended.",
    ],
    rules: [
      "All submitted designs must be original.",
      "Participants may use standard design tools.",
      "Submissions must be made before the deadline.",
    ],
    instructions: [
      "Complete registration.",
      "Create your design submission.",
      "Upload the final design through the submission portal.",
    ],
  },
  {
    title: "BizSpark Case Competition 2026",
    slug: "bizspark-case-competition-2026",
    organizer: "Future Leaders",
    shortDescription:
      "Solve business problems and present your strategy to industry experts.",
    description:
      "BizSpark Case Competition challenges participants to analyze business scenarios and propose practical solutions.",
    about:
      "The competition focuses on strategy, market analysis, business innovation, and presentation skills.",
    category: CompetitionCategory.BUSINESS,
    mode: CompetitionMode.HYBRID,
    registrationStart: new Date("2026-09-10"),
    registrationDeadline: new Date("2026-10-18"),
    competitionStart: new Date("2026-10-22"),
    competitionEnd: new Date("2026-10-25"),
    prizePool: 50000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      { position: "1st", amount: 25000, description: "Winner prize" },
      { position: "2nd", amount: 15000, description: "Runner-up prize" },
      {
        position: "3rd",
        amount: 10000,
        description: "Second runner-up prize",
      },
    ],
    eligibility: [
      "Open to undergraduate and postgraduate students.",
      "Participants may compete individually or in teams.",
      "Teams can have up to four members.",
    ],
    rules: [
      "All team members must complete registration.",
      "Solutions must be original.",
      "Teams must follow the official submission format.",
    ],
    instructions: [
      "Register individually or create a team.",
      "Analyze the provided business case.",
      "Submit and present your proposed solution.",
    ],
  },
  {
    title: "AI Innovation Challenge 2026",
    slug: "ai-innovation-challenge-2026",
    organizer: "TechVision",
    shortDescription:
      "Build innovative AI solutions for real-world problems.",
    description:
      "A national competition focused on practical artificial intelligence solutions.",
    about:
      "Participants can showcase their AI skills by solving real-world challenges.",
    category: CompetitionCategory.INNOVATION,
    mode: CompetitionMode.ONLINE,
    registrationStart: new Date("2026-08-01"),
    registrationDeadline: new Date("2026-10-20"),
    competitionStart: new Date("2026-10-22"),
    competitionEnd: new Date("2026-11-05"),
    prizePool: 125000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      {
        position: "1st",
        amount: 75000,
        description: "Winner",
      },
      {
        position: "2nd",
        amount: 30000,
        description: "Runner Up",
      },
      {
        position: "3rd",
        amount: 20000,
        description: "Second Runner Up",
      },
    ],
    eligibility: [
      "Students and recent graduates",
      "Open to participants across India",
    ],
    rules: [
      "Submit an original AI solution",
      "One submission per participant or team",
    ],
    instructions: [
      "Register before the deadline",
      "Submit the final solution through the competition portal",
    ],
  },
  {
    title: "National Design Sprint 2026",
    slug: "national-design-sprint-2026",
    organizer: "DesignHub India",
    shortDescription:
      "Solve a real-world design problem and showcase your creativity.",
    description:
      "A design competition for students interested in UI, UX and visual design.",
    about:
      "Participants will create practical design solutions while demonstrating their design thinking skills.",
    category: CompetitionCategory.DESIGN,
    mode: CompetitionMode.ONLINE,
    registrationStart: new Date("2026-08-05"),
    registrationDeadline: new Date("2026-10-24"),
    competitionStart: new Date("2026-10-26"),
    competitionEnd: new Date("2026-11-08"),
    prizePool: 90000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      {
        position: "1st",
        amount: 50000,
        description: "Winner",
      },
      {
        position: "2nd",
        amount: 25000,
        description: "Runner Up",
      },
      {
        position: "3rd",
        amount: 15000,
        description: "Second Runner Up",
      },
    ],
    eligibility: [
      "Students from any discipline",
      "Open to individual participants",
    ],
    rules: [
      "Designs must be original",
      "Participants must submit their work before the deadline",
    ],
    instructions: [
      "Complete registration",
      "Upload the final design submission",
    ],
  },
  {
    title: "CodeQuest Hack Challenge 2026",
    slug: "codequest-hack-challenge-2026",
    organizer: "DevCommunity",
    shortDescription:
      "Compete with developers and build technology solutions.",
    description:
      "A coding competition designed to challenge participants with practical programming problems.",
    about:
      "Participants compete through multiple programming challenges and demonstrate their problem-solving abilities.",
    category: CompetitionCategory.CODING,
    mode: CompetitionMode.ONLINE,
    registrationStart: new Date("2026-08-10"),
    registrationDeadline: new Date("2026-10-27"),
    competitionStart: new Date("2026-10-29"),
    competitionEnd: new Date("2026-11-02"),
    prizePool: 150000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      {
        position: "1st",
        amount: 100000,
        description: "Winner",
      },
      {
        position: "2nd",
        amount: 30000,
        description: "Runner Up",
      },
      {
        position: "3rd",
        amount: 20000,
        description: "Second Runner Up",
      },
    ],
    eligibility: [
      "Students and developers",
      "Open to participants across India",
    ],
    rules: [
      "Solutions must be submitted within the competition period",
      "Participants must follow the competition guidelines",
    ],
    instructions: [
      "Register for the challenge",
      "Complete the coding challenges",
    ],
  },
  {
    title: "Future Business Leaders Challenge 2026",
    slug: "future-business-leaders-challenge-2026",
    organizer: "Business League",
    shortDescription:
      "Test your strategy, leadership and business problem-solving skills.",
    description:
      "A business competition focused on strategic thinking and practical business decisions.",
    about:
      "Participants analyze business situations and present solutions to real-world problems.",
    category: CompetitionCategory.BUSINESS,
    mode: CompetitionMode.HYBRID,
    registrationStart: new Date("2026-08-15"),
    registrationDeadline: new Date("2026-10-30"),
    competitionStart: new Date("2026-11-02"),
    competitionEnd: new Date("2026-11-12"),
    prizePool: 110000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      {
        position: "1st",
        amount: 60000,
        description: "Winner",
      },
      {
        position: "2nd",
        amount: 30000,
        description: "Runner Up",
      },
      {
        position: "3rd",
        amount: 20000,
        description: "Second Runner Up",
      },
    ],
    eligibility: [
      "Undergraduate and postgraduate students",
      "Individual or team participation",
    ],
    rules: [
      "Business solutions must be original",
      "Teams must follow the competition format",
    ],
    instructions: [
      "Register before the deadline",
      "Submit the business case solution",
    ],
  },
  {
    title: "Academic Excellence Challenge 2026",
    slug: "academic-excellence-challenge-2026",
    organizer: "Scholar Network",
    shortDescription:
      "Challenge your knowledge and compete with students nationwide.",
    description:
      "An academic competition covering analytical and subject-based problem solving.",
    about:
      "Students can demonstrate their academic knowledge through a series of competitive challenges.",
    category: CompetitionCategory.ACADEMIC,
    mode: CompetitionMode.ONLINE,
    registrationStart: new Date("2026-08-20"),
    registrationDeadline: new Date("2026-11-02"),
    competitionStart: new Date("2026-11-05"),
    competitionEnd: new Date("2026-11-06"),
    prizePool: 60000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      {
        position: "1st",
        amount: 35000,
        description: "Winner",
      },
      {
        position: "2nd",
        amount: 15000,
        description: "Runner Up",
      },
      {
        position: "3rd",
        amount: 10000,
        description: "Second Runner Up",
      },
    ],
    eligibility: [
      "College and university students",
      "Open to students across India",
    ],
    rules: [
      "Participants must complete the challenge individually",
      "All submissions must be completed before the deadline",
    ],
    instructions: [
      "Complete registration",
      "Attempt all competition questions",
    ],
  },
  {
    title: "Startup Idea League 2026",
    slug: "startup-idea-league-2026",
    organizer: "Startup India Network",
    shortDescription:
      "Turn your startup idea into a compelling business solution.",
    description:
      "A startup-focused competition for students and young innovators.",
    about:
      "Participants present startup ideas and demonstrate their understanding of customers, markets and business models.",
    category: CompetitionCategory.INNOVATION,
    mode: CompetitionMode.HYBRID,
    registrationStart: new Date("2026-08-25"),
    registrationDeadline: new Date("2026-11-08"),
    competitionStart: new Date("2026-11-10"),
    competitionEnd: new Date("2026-11-20"),
    prizePool: 200000,
    status: CompetitionStatus.PUBLISHED,
    prizes: [
      {
        position: "1st",
        amount: 120000,
        description: "Winner",
      },
      {
        position: "2nd",
        amount: 50000,
        description: "Runner Up",
      },
      {
        position: "3rd",
        amount: 30000,
        description: "Second Runner Up",
      },
    ],
    eligibility: [
      "Students and young entrepreneurs",
      "Individual or team participation",
    ],
    rules: [
      "Startup ideas must be original",
      "Teams must submit a complete business proposal",
    ],
    instructions: [
      "Register for the competition",
      "Submit the startup proposal",
    ],
  },
];

async function main() {
  await prisma.competitionBookmark.deleteMany();
  await prisma.competitionRegistration.deleteMany();
  await prisma.competitionPrize.deleteMany();
  await prisma.competitionEligibility.deleteMany();
  await prisma.competitionRule.deleteMany();
  await prisma.competitionInstruction.deleteMany();
  await prisma.competition.deleteMany();

  for (const competition of competitions) {
    const {
      prizes,
      eligibility,
      rules,
      instructions,
      ...competitionData
    } = competition;

    await prisma.competition.create({
      data: {
        ...competitionData,
        prizes: {
          create: prizes,
        },
        eligibility: {
          create: eligibility.map((value) => ({ value })),
        },
        rules: {
          create: rules.map((value) => ({ value })),
        },
        instructions: {
          create: instructions.map((value) => ({ value })),
        },
      },
    });
  }

  console.log(`Seeded ${competitions.length} competitions`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });