import { Request, Response } from "express";
import * as ticketServices from "../services/ticketServices";
import type { Ticket, ticketPriority, ticketStatus, TicketWithUrgency } from "../services/ticketServices";

/**
 * Creates a new ticket based on the request body
 * @param req - Receives a title, description and priority for a new ticket as a request body
 * @param res - The response from the API call
 * @returns Returns either failure message or creation message with a new ticket data
 */
export const createTicket = (req: Request, res: Response): void => {
       //call the service function to create a new ticket
       try {
              const ticketPriority: ticketPriority[] = ["critical", "high", "medium", "low"];
              
              // Validate new ticket title
              if(typeof req.body.title !== "string" || req.body.title.trim() ===""){
                     res.status(400).json({
                            message: "Missing required field: title"
                     });
              } 

              // Validate new ticket description
              if(typeof req.body.description !== "string" || req.body.description.trim() ===""){
                     res.status(400).json({
                            message: "Missing required field: description"
                     });
              } 

              // Validate new ticket priority
              if(!req.body.priority || !ticketPriority.includes(req.body.priority as ticketPriority)){
                     res.status(400).json({
                            message: "Invalid priority. Must be one of: critical, high, medium, low"
                     });
              } 

              const title: string = req.body.title;
              const description: string = req.body.description;
              const priority: ticketPriority = req.body.priority;

              const newTicket: Ticket = ticketServices.createATicket(title, description, priority);

              res.status(201).json({
                     message: `A new ticket is created with title: ${title}, description: ${description}, and priority: ${priority}.`,
                     data: newTicket
              });
       } catch (error){
              res.status(500).json({
                     message: "Failed to create a new ticket."
              });
       }
}

/**
 * Retrieve all the ticket data from the server
 * @param req - No request body needed
 * @param res - The response from the API call
 * @returns Returns all the ticket data
 */
export const getAllTickets = (req: Request, res: Response): void => {
       // Call the service function to get all the tickets
       const ticketList: Ticket[] = ticketServices.getAllTickets();
       res.status(200).json({
              message: "Tickets retrieved",
              count: ticketList.length,
              data: ticketList
       });
}

/**
 * Retrieve a ticket data with a specific id from the server
 * @param req - Receives a ticket id as route parameters
 * @param res - The response from the API call
 * @returns Returns a ticket data with a specific id
 */
export const getTicketById = (req: Request, res: Response): void => {
       // Call the service function to get the ticket by id

       // Validate ticket Id
       const ticketId: number = Number(req.params.id);
       if(ticketId <= 0 || !Number.isInteger(ticketId)){
              res.status(400).json({
                     message: "Id must be a positive integer"
              });
       }

       const ticket: Ticket | null = ticketServices.getTicketById(ticketId);

       // Check if ticket was found
       if(ticket === null){
              res.status(404).json({
                     message: "Ticket not found"
              });
       }

       res.status(200).json({
              message: `Ticket with id: ${ticketId} found`,
              data: ticket
       });
}

/**
 * Update an existing ticket data with a specific id 
 * @param req - Receives a ticket id as route parameters and optional fields data to be updated 
 *              such as priority and status
 * @param res - The response from the API call
 * @returns Returns either failure message or success message with a updated ticket data
 */
export const updateTicket = (req: Request, res: Response): void => {
       //call the service function to update a ticket
       const ticketPriority: ticketPriority[] = ["critical", "high", "medium", "low"];
       const ticketStatus: ticketStatus[] = ["open", "resolved", "in-progress"];
       const ticketId: number = Number(req.params.id);
       
       // Validate ticket Id
       if(ticketId <= 0 || !Number.isInteger(ticketId)){
              res.status(400).json({
                     message: "Id must be a positive integer"
              });
       }

       // Validate priority if received
       if(req.body.priority !== undefined){
              if(typeof req.body.priority !== "string" || !ticketPriority.includes(req.body.priority as ticketPriority)){
                     res.status(400).json({
                            message: "Invalid priority. Must be one of: critical, high, medium, low"
                     });
              }
       }

       // Validate status if received
       if(req.body.status !== undefined){
              if(typeof req.body.status !== "string" || !ticketStatus.includes(req.body.status as ticketStatus)){
                     res.status(400).json({
                            message: "Invalid status. Must be one of: open, in-progress, resolved"
                     });
              }
       }

       const newPriority: ticketPriority = req.body.priority;
       const newStatus: ticketStatus = req.body.status;

       const updatedTicket = ticketServices.updateTicket(ticketId, newPriority, newStatus);
       
       // Check if ticket was found
       if(updatedTicket === null){
              res.status(404).json({
                     message: "Ticket not found"
              });
       }

       res.status(200).json({
              message: "Ticket successfully updated",
              data: updatedTicket
       });
}
/**
 * Delete an existing ticket data with a specific id 
 * @param req - Receives a ticket id as route parameters
 * @param res - The response from the API call
 * @returns Returns either failure message or success message
 */
export const deleteTicket = (req: Request, res: Response): void => {
       // call the service function to delete a ticket
       
       // Validate ticket Id
       const ticketId: number = Number(req.params.id);
       if(ticketId <= 0 || !Number.isInteger(ticketId)){
              res.status(404).json({
                     message: "Ticket not found"
              });
       }
       const message: string = ticketServices.deleteTicket(ticketId);

       res.status(200).json({
              message: message
       });

}

/**
 * Retrieves a ticket with urgency details
 * Calculates the urgency score and assign the urgency level according to the score
 * @param req - Receives a ticket id as route parameters
 * @param res - The response object used to send the response back to the client
 * @returns Returns either failure message or success message with a ticket data with urgency details
 */
export const ticketUrgency = (req: Request, res: Response): void => {
       //call the service function to get a ticket with urgency details

       // Validate ticket Id
       const ticketId: number = Number(req.params.id);
       if(ticketId <= 0 || !Number.isInteger(ticketId)){
              res.status(400).json({
                     message: "Id must be a positive integer"
              });
       }

       const ticketWithUrgency: TicketWithUrgency | null = ticketServices.showTicketWithUrgency(ticketId);

       // Check if the ticket was found or not
       if(ticketWithUrgency === null){
              res.status(404).json({
                     message: "Ticket not found"
              });
       }

       res.json({
              message: "Ticket urgency calculated",
              data: ticketWithUrgency
       });
}
/** 
 * Check the status of the server
 */
export const healthCheck = (req: Request, res: Response): void => {
       res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
}