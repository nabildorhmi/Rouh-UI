export interface Service {
  title: string;
  description: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
}

export interface GuestTier {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export type ReservationMode = "agency" | "podcast";

export interface ReservationFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic?: string;
  preferredDates?: string;
  message?: string;
}
