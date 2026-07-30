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

export interface RentalPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  staffing: "dry-hire" | "staffed";
  gearTier: string;
  capacity: number;
  equipment: string[];
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

export interface Testimonial {
  id: string;
  category: "agency" | "podcast" | "both";
  quote: string;
  name: string;
  role: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  label: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

