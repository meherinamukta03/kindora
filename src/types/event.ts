export type EventType =
  | "Plantation"
  | "Cleanup"
  | "Donation"
  | "Education"
  | "Health";

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: EventType;
  image: string;
  location: string;
  date: string;
  userEmail?: string;
  organizer?: string;
  organizerTitle?: string;
  contactEmail?: string;
}