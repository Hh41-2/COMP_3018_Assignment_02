export type ticketPriority = "critical" | "high" | "medium" | "low";
export type ticketStatus = "open" | "resolved";

interface Ticket {
       id: number;
       title: string;
       description: string;
       priority: ticketPriority;
       status: ticketStatus;
       createdAt: string;
}

type TicketWithUrgency = Ticket & {
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

const ticketLists: Tickets[] = [ 
       {id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: calculateDate(3)
       },
       {id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: calculateDate(2)
       },
       {id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: calculateDate(6)
       },
       {id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: calculateDate(5)
       },
       {id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: calculateDate(9)
       },
       {id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: calculateDate(6)
       },
       {id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after refresh",
        priority: "medium",
        status: "resolved",
        createdAt: calculateDate(10)
       }
];

export const createATicket = (title: string, description: string, priority: ticketPriority): Ticket => {
       const lastTicketId: number = ticketLists.length > 0 ? ticketLists[ticketLists.length - 1].id : 0;
       
       const newTicket: Ticket = {
              id: lastTicketId + 1,
              title: title,
              description: description,
              priority: priority,
              status: "open",
              createdAt: new Date().toISOString()
       };

       ticketLists.push(newTicket);
       return newTicket;
}