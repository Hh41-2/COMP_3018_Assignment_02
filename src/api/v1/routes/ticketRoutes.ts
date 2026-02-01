import express, {Router} from "express";
import { getAllTickets, getTicketByIdWithUrgency, createTicket , deleteTicket } from "../controllers/ticketController";

const router: Router = express.Router();

router.get("/tickets", getAllTickets);
router.get("/tickets/:id/urgency", getTicketByIdWithUrgency);
router.post("/tickets", createTicket);
router.delete("/tickets/:id", deleteTicket)

export default router;