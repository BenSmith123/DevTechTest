export interface Appointment {
  id: number;
  description: string;
  start: string;
  end: string;
  notes: string[];
  party: number[];
  providerEmail: string;
}
