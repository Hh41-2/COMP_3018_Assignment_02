import express, { Express } from "express";
import morgan from "morgan";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

// Initialize Express application
const app: Express = express();

app.use(express.json());

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1",ticketRoutes);

// app.get("api/v1/health", (req,res) => {
//     //return the health check information
//     res.json()
// });

// app.get("/api/v1/tickets", (req, res) => {
//        // returns all the tickets with message and ticket count
//        res.json()
// });

// app.get("/api/v1/tickets/:id/urgency", (req, res) => {
//        // returns a ticket by id with message 
//        res.json()
// });

export default app;