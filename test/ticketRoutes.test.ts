import request from "supertest";
import app from "../src/app";
import * as ticketController from "../src/api/v1/controllers/ticketController";
import { calculateDate } from "../src/api/v1/services/ticketServices";

jest.mock("../src/api/v1/controllers/ticketController", () => ({
    healthCheck: jest.fn((req, res) => res.status(200).send()),
    getAllTickets: jest.fn((req, res) => res.status(200).send()),
    getTicketById: jest.fn((req, res) => res.status(200).send()),
    ticketUrgency: jest.fn((req, res) => res.status(200).send()),
    updateTicket: jest.fn((req, res) => res.status(200).send()),
    createTicket: jest.fn((req, res) => res.status(201).send()),
    deleteTicket: jest.fn((req, res) => res.status(200).send()),
}));

describe("Route Tests using mocks", () => {
       it("should call a function healthcheck controller", async () => {
              // Act
              await request(app).get("/api/v1/health");

              // Assert
              expect(ticketController.healthCheck).toHaveBeenCalled();
       });
       
       it("should call a function getAllTickets controller", async () => {
              // Act
              await request(app).get("/api/v1/tickets");

              // Assert
              expect(ticketController.getAllTickets).toHaveBeenCalled();
       });

       it("should call a function getTicketById controller", async () => {
              // Arrange
              const mockTicket = {
                      id: 2,
                      title: "Profile picture upload slow",
                      description: "Upload takes 30+ seconds",
                      priority: "medium",
                      status: "open",
                      createdAt: calculateDate(2)
                     }
              
              // Act
              await request(app).get("/api/v1/tickets/2").send(mockTicket);

              // Assert
              expect(ticketController.getTicketById).toHaveBeenCalled();
       });

       it("should call a function ticketUrgency controller", async () => {
              // Arrange
              const mockTicket = {
                     "id": 6,
                     "title": "Login page not loading",
                     "description": "Users report blank screen on login",
                     "priority": "critical",
                     "status": "open",
                     "createdAt": calculateDate(6),
                     "ticketAge": 6,
                     "urgencyScore": 80,
                     "urgencyLevel": "Critical. Immediate attention required."
                     }
              
              // Act
              await request(app).get("/api/v1/tickets/6/urgency").send(mockTicket);

              // Assert
              expect(ticketController.getTicketById).toHaveBeenCalled();
       });

       it("should call a function updateTicket controller", async () => {
              // Arrange
              const mockTicket = {
                     "id": 6,
                     "priority": "low",
                     "status": "in-progress",
              }
              
              // Act
              await request(app).put("/api/v1/tickets/6").send(mockTicket);

              // Assert
              expect(ticketController.updateTicket).toHaveBeenCalled();
       });

       it("should call a function createTicket controller", async () => {
              // Arrange
              const mockTicket = {
                     "title": "createTicket Testing",
                     "description": "testing data for createTicket function",
                     "priority": "critical"
              }
              
              // Act
              await request(app).post("/api/v1/tickets").send(mockTicket);

              // Assert
              expect(ticketController.createTicket).toHaveBeenCalled();
       });

       it("should call a function deleteTicket controller", async () => {
              // Act
              await request(app).delete("/api/v1/tickets/5")

              // Assert
              expect(ticketController.deleteTicket).toHaveBeenCalled();
       });
});