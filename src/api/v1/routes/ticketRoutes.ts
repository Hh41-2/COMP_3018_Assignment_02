import express, {Router} from "express";
import { getAllTickets, getTicketByIdWithUrgency, createTicket } from "../controllers/ticketController";

const router: Router = express.Router();

router.get("/tickets", getAllTickets);
router.get("/tickets/:id/urgency", getTicketByIdWithUrgency);
router.post("/tickets", createTicket);


export default router;