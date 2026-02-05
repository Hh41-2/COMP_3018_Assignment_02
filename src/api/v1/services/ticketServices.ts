/** Represents the different ticket priority */ 
export type ticketPriority = "critical" | "high" | "medium" | "low";

/** Represents the different ticket status */ 
export type ticketStatus = "open" | "resolved" | "in-progress";

/** 
 * Represents a ticket with the detail information of ticket 
 */ 
export interface Ticket {
       /** Unique identifier for a ticket */
       id: number;

       /** The title of a ticket */
       title: string;

       /** The description of a ticket */
       description: string;

       /** The priority/urgency of a ticket */
       priority: ticketPriority;

       /** The current status of a ticket */
       status: ticketStatus;

       /** The ticket creation date */
       createdAt: string;
}

/**
 * Represents the detail of ticket urgency
 */
export type TicketWithUrgency = Ticket & {
       /** The age of a ticket in days since its creation  */
       ticketAge: number;

       /** The urgency score calculated based on ticket's age and priority */
       urgencyScore: number;

       /** The summary of the current urgency */
       urgencyLevel: string;
}

/**
 * Base score depending on the priority
 */
export const BASE_URGENCY = {
       critical: 50,
       high: 30,
       medium: 20,
       low: 10
} as const;
/**
 * Classifies the urgency level based on the urgency score
 * @param score - The urgency score  
 * @returns The statement summary 
 */
const urgencyLevelStatement = (
       score: number
): 
       |"critical-level"
       |"high-level"
       |"medium-level"
       |"low-level" => {
       if(score >= 80) return "critical-level";
       if(score >= 55) return "high-level";
       if(score >= 30) return "medium-level";
       return "low-level";
}       
/**
 * Provides a summary of urgency level
 * @param type - The urgency statement type
 * @returns A message of current urgency level
 */
const urgencyLevelSummaryByScore = (
       type: 
              |"critical-level"
              |"high-level"
              |"medium-level"
              |"low-level"
): string => {
       switch (type) {
              case "critical-level":
                     return "Critical. Immediate attention required."
              case "high-level":
                     return "High urgency. Prioritize resolution."
              case "medium-level":
                     return "Moderate. Schedule for attention."
              case "low-level":
                     return "Low urgency. Address when capacity allows."
       }
}

/** 
 *  Calculate how many days passed by from today
 *  @param daysApart - Number of days passed by from today
 *  @returns An ISO-8601 timestamp for a days before today
 */
export const calculateDate = (daysApart: number = 0): string => {
       return new Date(Date.now() - daysApart * 24 * 60 * 60 * 1000).toISOString();
};

/** Provided list of tickets */
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

/** Create a new ticket based on the parameters
 *  @param title - The title for a new ticket
 *  @param description - The description for a new ticket
 *  @param priority - The priority for a new ticket
 */
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

/** Return all the tickets created in the list */
export const getAllTickets = () : Ticket[] => {
       return ticketLists;
}

/** Search the ticket with id
 *  @param id - id required to search a specific ticket 
 *  @return The ticket with specific id
 */
export const getTicketById = (id: number): Ticket | null => {
       const ticketById: Ticket | undefined = ticketLists.find((x) => x.id === id);
       
       return ticketById ? ticketById : null;
}

/**
 * Updates existing tickets with provided parameters
 * @param id - id of a specific ticket
 * @param newPriority - Optional param to update the existing priority 
 * @param newStatus - Optional param to update the existing status 
 * @returns an updated ticket
 */
export const updateTicket = (id: number, newPriority?: ticketPriority, newStatus?: ticketStatus): Ticket | null => {
       const ticket: Ticket | null = getTicketById(id);
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

/**
 * Calculates the urgency score and provides a message based on the urgency level
 * @param id - id of a specific ticket
 * @returns a ticket with detailed urgency information
 */
export const showTicketWithUrgency = (id: number): TicketWithUrgency | null => {
       const ticket: Ticket | null = getTicketById(id);
       if(ticket === null){
              return null;
       }

       /** Calculate the ticket age based on the creation date */
       const ageInMs: number = Date.now() - new Date(ticket.createdAt).getTime();
       const ageInDays: number = Math.floor(ageInMs / (1000 * 60 * 60 * 24));

       const multiplier: number = 5;

       /** Calculate the ticket urgency scorer based on the base urgency point, the ticket age and multiplier */ 
       let urgencyScore: number = BASE_URGENCY[ticket.priority] + (ageInDays * multiplier);

       let urgencySummary: string;
       const urgencyType: string = urgencyLevelStatement(urgencyScore);

       /** Hnadling resolved situation  */
       if(ticket.status === "resolved"){
              urgencySummary = "Minimal. Ticket resolved.";
              urgencyScore = 0;
       } else {
              urgencySummary = urgencyLevelSummaryByScore(urgencyType);
       }

       const ticketWithUrgency: TicketWithUrgency = {
              ...ticket,
              ticketAge: ageInDays,
              urgencyScore: urgencyScore,
              urgencyLevel: urgencySummary
       }

       return ticketWithUrgency;
}
/**
 * Delete an existing ticket with specific id
 * @param id - id of a specific ticket
 * @returns a summary of deletion process
 */
export const deleteTicket = (id: number): string => {
       const index: number = ticketLists.findIndex((x) => x.id === id)
       if(index < 0){
              return `Ticket with id: ${id} was not found.`;
       }

       ticketLists.splice(index, 1);
       return `Ticket with id: ${id} was successfully deleted.`
}

