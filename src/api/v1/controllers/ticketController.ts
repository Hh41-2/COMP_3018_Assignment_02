import { Request, Response } from "express";
import * as ticketServices from "../services/ticketServices";
import type { Ticket, ticketPriority } from "../services/ticketServices";

export const createTicket = (req: Request, res: Response) => {
       //call the service function to create a new ticket
       try {
              const ticketPriority: ticketPriority[] = ["critical", "high", "medium", "low"];
                            
              if(typeof req.body.title !== "string" || req.body.title.trim() ===""){
                     return res.status(400).json({
                            message: "Missing required field: title"
                     });
              } 

              if(typeof req.body.description !== "string" || req.body.description.trim() ===""){
                     return res.status(400).json({
                            message: "Missing required field: description"
                     });
              } 

              if(!req.body.priority || !ticketPriority.includes(req.body.priority as ticketPriority)){
                     return res.status(400).json({
                            message: "Invalid priority. Must be one of: critical, high, medium, low"
                     });
              } 
              const title: string = req.body.title;
              const description: string = req.body.description;
              const priority: ticketPriority = req.body.priority;

              const newTicket: Ticket = ticketServices.createATicket(title, description, priority);

              res.status(201).json({
                     message: `A new ticket is created with title: ${title}, description: ${description},
                     and priority: ${priority}.`,
                     data: newTicket
              });
       } catch (error){
              return res.status(500).json({
                            message: "Failed to create a new ticket."
                     });
       }
}

export const getAllTickets = (req: Request, res: Response) => {
       //call the service function to get all the tickets
       const ticketList: Ticket[] = ticketServices.getAllTickets();
       res.status(200).json({
              message: "Tickets retrieved",
              count: ticketList.length,
              data: ticketList
       });
}

export const getTicketByIdWithUrgency = (req: Request, res: Response) => {
       //call the service function to get the ticket by id
       const ticketId: number = Number(req.params.id);
       if(ticketId <= 0 || !Number.isInteger(ticketId)){
              return res.status(404).json({
                     message: "Ticket not found"
              });
       }

       const ticketWithUrgency = ticketServices.showTicketWithUrgency(ticketId);
       if(ticketWithUrgency === null){
              return res.status(404).json({
                     message: "Ticket not found"
              });
       }

       res.json({
              message: "Ticket urgency calculated",
              data: ticketWithUrgency
       });

}


export const updateTicket = (req: Request, res: Response) => {
       //call the service function to update a ticket
       
}

export const deleteTicket = (req: Request, res: Response) => {
       //call the service function to delete a ticket
       const ticketId: number = Number(req.params.id);
       if(ticketId <= 0 || !Number.isInteger(ticketId)){
              return res.status(404).json({
                     message: "Ticket not found"
              });
       }
       const message: string = ticketServices.deleteTicket(ticketId);

       res.status(200).json({
              message: message
       });

}

export const ticketUrgency = (req: Request, res: Response) => {
       //call the service function to get a ticket with urgency details
       res.json();

}