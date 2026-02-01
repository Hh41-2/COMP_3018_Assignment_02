import express, {Router} from "express";
import { getAllTickets, getTicketByIdWithUrgency } from "../controllers/ticketController";

const router: Router = express.Router();

router.get("/tickets", getAllTickets);
router.get("/tickets/:id/urgency", getTicketByIdWithUrgency);

export default router;