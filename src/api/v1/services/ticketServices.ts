export type ticketPriority = "critical" | "high" | "medium" | "low";
export type ticketStatus = "open" | "resolved";

interface Tickets {
       id: number;
       title: string;
       description: string;
       priority: ticketPriority;
       status: ticketStatus;
       createdAt: string;
}

type TicketWithUrgency = Tickets & {
       ticketAge: number;
       urgencyScore: number;
       urgencyLevel: string;
}

export const BASE_URGENCY = {
       critical: 50,
       high: 30,
       medium: 20,
       low: 10
} as const;

export const calculateDate = (daysApart: number = 0): string => {
       return new Date(Date.now() - daysApart * 24 * 60 * 60 * 1000).toISOString();
};