export type ticketPriority = "critical" | "high" | "medium" | "low";
export type ticketStatus = "open" | "resolved";

export interface Ticket {
       id: number;
       title: string;
       description: string;
       priority: ticketPriority;
       status: ticketStatus;
       createdAt: string;
}

export type TicketWithUrgency = Ticket & {
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

const urgencyLevelSummary = (
       type: 
           |"critical"
           |"high"
           |"medium"
           |"low"
): string => {
       switch (type) {
              case "critical":
                     return "Critical. Immediate attention required."
              case "high":
                     return "High urgency. Prioritize resolution."
              case "medium":
                     return "Moderate. Schedule for attention."
              default:
                     return "Low urgency. Address when capacity allows."
       }
};



export const calculateDate = (daysApart: number = 0): string => {
       return new Date(Date.now() - daysApart * 24 * 60 * 60 * 1000).toISOString();
};

const ticketLists: Ticket[] = [ 
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

export const getAllTickets = () : Ticket[] => {
       return ticketLists;
}

export const getTicketById = (id: number): Ticket | null => {
       const ticketById = ticketLists.find((x) => x.id === id);
       
       return ticketById ? ticketById : null;
}

export const updateTicket = (id: number, newPriority?: ticketPriority, newStatus?: ticketStatus): Ticket | null => {
       const ticket = getTicketById(id);
       if(ticket === null) {
              return null;
       }

       if(newPriority !== undefined){
              ticket.priority = newPriority;
       }
       
       if(newStatus !== undefined){
              ticket.status = newStatus;
       }
       
       return ticket;
}

export const showTicketWithUrgency = (id: number): TicketWithUrgency | null => {
       const ticket = getTicketById(id);
       if(ticket === null){
              return null;
       }

       const ageInMs = Date.now() - new Date(ticket.createdAt).getTime();
       const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));

       const multiplier: number = 5;
       let urgencyScore = BASE_URGENCY[ticket.priority] + (ageInDays * multiplier);

       let urgencySummary: string;

       if(ticket.status === "resolved"){
              urgencySummary = "Minimal. Ticket resolved.";
              urgencyScore = 0;
       } else {
              urgencySummary = urgencyLevelSummary(ticket.priority);
       }
       

       const ticketWithUrgency: TicketWithUrgency = {
              ...ticket,
              ticketAge: ageInDays,
              urgencyScore: urgencyScore,
              urgencyLevel: urgencySummary
       }

       return ticketWithUrgency;
}

export const deleteTicket = (id: number): string => {
       const index: number = ticketLists.findIndex((x) => x.id === id)
       if(index < 0){
              return `Ticket with id: ${id} was not found.`;
       }

       ticketLists.splice(index, 1);
       return `Ticket with id: ${id} was successfully deleted.`
}