import express, {Router} from "express";
import { getAllTickets, getTicketById, ticketUrgency, createTicket , deleteTicket } from "../controllers/ticketController";

const router: Router = express.Router();

router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicketById);
router.get("/tickets/:id/urgency", ticketUrgency);
router.post("/tickets", createTicket);
router.delete("/tickets/:id", deleteTicket)

export default router;