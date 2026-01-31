import { Request, Response } from "express";

export const getAllTickets = (req: Request, res: Response) => {
       //call the service function to get all the tickets
       res.json();

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