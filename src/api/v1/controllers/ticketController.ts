import { Request, Response } from "express";
import * as ticketServices from "../services/ticketServices";
import type { Ticket } from "../services/ticketServices";

export const getAllTickets = (req: Request, res: Response) => {
       //call the service function to get all the tickets
       const ticketList: Ticket[] = ticketServices.getAllTickets();
       res.status(200).json({
              message: "Tickets retrieved",
              count: ticketList.length,
              data: ticketList
       });
}

export const getTicketById = (req: Request, res: Response) => {
       //call the service function to get the ticket by id
       res.json();

}

export const updateTicket = (req: Request, res: Response) => {
       //call the service function to update a ticket
       res.json();

}

export const deleteTicket = (req: Request, res: Response) => {
       //call the service function to delete a ticket
       res.json();

}

export const ticketUrgency = (req: Request, res: Response) => {
       //call the service function to get a ticket with urgency details
       res.json();

}