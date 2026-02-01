import express, {Router} from "express";
import { getAllTickets } from "../controllers/ticketController";

const router: Router = express.Router();

router.get("/tickets", getAllTickets);

export default router;