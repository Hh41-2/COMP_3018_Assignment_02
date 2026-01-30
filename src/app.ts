import express, { Express } from "express";
import morgan from "morgan";

// Initialize Express application
const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

export default app;