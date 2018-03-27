
export interface Post {
  id: number;
  description: string;
  start: string; // needs to be date
  end: string; // needs to be date
  notes: string[];
  party: number[];
  providerEmail: string;
}
