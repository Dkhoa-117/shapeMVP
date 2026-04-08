export enum SolutionStatus {
  Active = 'Active',
  Beta = 'Beta',
  Archived = 'Archived',
  Draft = 'Draft',
}

export enum SolutionPhase {
  Ideation = 'Ideation',
  POC = 'POC',
  MVP = 'MVP',
  IND = 'IND',
}

export enum SolutionCost {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum SolutionCible {
  Management = 'Management',
  Operationnel = 'Opérationnel',
  Client = 'Client',
}

export enum SolutionLevierValeur {
  Revenu = 'Revenu',
  Productivite = 'Productivité',
  Risque = 'Risque',
}

export enum InitiativeType {
  VilleDuFutur = 'Living Avenues',
  Ports = 'Resilience du trait et de côte',
  Aeroports = 'Aéroports',
  Soins = 'Infrastructures de soins',
  DataCenters = 'Data Centers',
  JournalIA = "Journal de l'IA",
}

export enum Filiale {
  Construction = 'Bouygues Construction',
  BatimentInternational = 'Bouygues Bâtiment International',
  BatimentFrance = 'Bouygues Bâtiment France',
  TravauxPublics = 'Bouygues Travaux Publics',
  EnergiesServices = 'Bouygues Energies & Services',
  Immobilier = 'Bouygues Immobilier',
  Colas = 'Colas',
  TF1 = 'TF1',
  LCI = 'LCI',
  BouyguesTelecom = 'Bouygues Telecom',
  Equans = 'Equans',
}

export interface KPI {
  label: string;
  value: string;
  unit?: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  domain: string;
  initiative: InitiativeType[];
  status: SolutionStatus;
  labels: string[];
  keyFigures: KPI[];
  imageUrl: string;
  lastModified?: string;
  views?: number;
  // New fields for detailed layout
  ratings?: {
    valeur: number; // 1-5
    complexite: number; // 1-5
    maturite: number; // 1-5
  };
  useCaseHtml?: string;
  useCaseHtmlEn?: string;
  valuesGainsHtml?: string;
  valuesGainsHtmlEn?: string;
  descriptionEn?: string;
  sidebarInfo?: {
    filiale?: Filiale[];
    cible?: SolutionCible[];
    levierValeur?: SolutionLevierValeur[];
    plateforme?: string;
    algorithmes?: string;
    phase?: SolutionPhase;
    cout?: SolutionCost;
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  client: string;
  description: string;
  imageUrl: string;
  relatedSolutions: string[]; // IDs
  views?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Initiative {
  id: string;
  slug: string;
  name: string;
  type: InitiativeType;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  keyFigures: KPI[];
  featuredImage: string;
  color: string;
  views?: number;
  ratings?: {
    valeur: number;
    complexite: number;
    maturite: number;
  };
}

// Admin Types

export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  entity: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: 'Create' | 'Update' | 'Delete' | 'Login';
  target: string;
  timestamp: string;
  details?: string;
}

export interface AppSettings {
  siteTitle: string;
  contactEmail: string;
  language: 'en' | 'fr';
  aiEnabled: boolean;
  aiApiKey: string;
}
