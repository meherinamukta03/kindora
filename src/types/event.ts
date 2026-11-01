export type EventType =
  | "Plantation"
  | "Cleanup"
  | "Donation"
  | "Education"
  | "Health";

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  type: EventType;
  location: string;
  date: string; // human-readable date for static UI
  organizer: string;
  organizerTitle: string;
  contactEmail: string;
}
