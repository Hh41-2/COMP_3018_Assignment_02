interface tickets {
       id: number;
       title: string;
       description: string;
       priority: string;
       status: string;
       createdAt: Date;
       ticketAge: number;
       urgencyScore: number;
       urgencyLevel: string;
}

export type ticketPriority = "critical" | "high" | "medium" | "low";

export const BASE_URGENCY = {
       critical: 50,
       high: 30,
       medium: 20,
       low: 10
} as const;