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

export default app;