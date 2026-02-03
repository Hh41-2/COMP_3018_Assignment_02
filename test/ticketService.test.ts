import { calculateDate, showTicketWithUrgency, Ticket } from "../src/api/v1/services/ticketServices";

describe("showTicketWithUrgency", () => {
       it(`should return with urgency score of 25 and message containing "Low"`, () => {
              // Arrange
              const ticketSample: Ticket = {
                     "id": 1,
                     "title": "Update footer copyright year",
                     "description": "Footer still shows 2024",
                     "priority": "low",
                     "status": "open",
                     "createdAt": calculateDate(3)
              }

              // Act
              const ticketWithUrgency = showTicketWithUrgency(ticketSample.id);

              // Assert
              expect(ticketWithUrgency?.urgencyScore).toBe(25);
              expect(ticketWithUrgency?.urgencyLevel).toContain("Low");
       });

       it(`should return with urgency score of 50 and message containing "Moderate"`, () => {
              // Arrange
              const ticketSample: Ticket = {
                     "id": 3,
                     "title": "Dashboard loading slowly",
                     "description": "Dashboard takes 10+ seconds to load",
                     "priority": "medium",
                     "status": "open",
                     "createdAt": calculateDate(6)
              }

              // Act
              const ticketWithUrgency = showTicketWithUrgency(ticketSample.id);

              // Assert
              expect(ticketWithUrgency?.urgencyScore).toBe(50);
              expect(ticketWithUrgency?.urgencyLevel).toContain("Moderate");
       });

       it(`should return with urgency score of 0 and message containing "resolved"`, () => {
              // Arrange
              const ticketSample: Ticket = {
                     "id": 7,
                     "title": "Dark mode toggle broken",
                     "description": "Dark mode doesn't persist after refresh",
                     "priority": "medium",
                     "status": "resolved",
                     "createdAt": calculateDate(10)
              }

              // Act
              const ticketWithUrgency = showTicketWithUrgency(ticketSample.id);

              // Assert
              expect(ticketWithUrgency?.urgencyScore).toBe(0);
              expect(ticketWithUrgency?.urgencyLevel).toContain("Minimal");
       });
});