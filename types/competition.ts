export interface CompetitionPrize {
  id: string;
  position: number;
  amount: number;
  description: string | null;
}

export interface CompetitionEligibility {
  id: string;
  competitionId: string;
  criteria: string;
}

export interface CompetitionRule {
  id: string;
  competitionId: string;
  rule: string;
}

export interface CompetitionInstruction {
  id: string;
  competitionId: string;
  instruction: string;
}

export interface Competition {
  id: string;
  title: string;
  slug: string;
  organizer: string;
  shortDescription: string;
  description: string;
  about: string;
  category: string;
  mode: string;
  registrationStart: string | null;
  registrationDeadline: string;
  competitionStart: string;
  competitionEnd: string;
  prizePool: number;
  status: string;
  prizes: CompetitionPrize[];
  eligibility: CompetitionEligibility[];
  rules: CompetitionRule[];
  instructions: CompetitionInstruction[];
  createdAt: string;
  updatedAt: string;
}