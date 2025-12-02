export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary'
}

export interface Item {
  id: string;
  name: string;
  type: 'Resource' | 'Weapon' | 'Consumable' | 'Material';
  rarity: Rarity;
  basePrice: number;
  currentPrice: number;
  quantity: number;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

export interface PlayerStats {
  level: number;
  xp: number;
  maxXp: number;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  credits: number;
  role: 'Soldier' | 'Merchant' | 'Engineer' | 'Logistics';
  address: string; // e.g., "Hunter_Sec7_42"
}

export interface MapPoint {
  id: string;
  x: number;
  y: number;
  type: 'Fortress' | 'Resource' | 'Enemy' | 'Ally' | 'Market' | 'Warehouse';
  name: string;
  distance: number;
  faction?: 'Neutral' | 'Hostile' | 'Allied';
}

export interface TransportJob {
  id: string;
  company: string;
  origin: string;
  destination: string;
  cargo: string;
  volume: number;
  reward: number;
  risk: 'Low' | 'Medium' | 'High';
  distance: string;
  deadline: string;
  providerType: 'System' | 'Player' | 'NPC_Corp';
}

export interface TransportVehicle {
  id: string;
  name: string;
  type: 'Drone' | 'Bike' | 'Truck' | 'Armored';
  status: 'Idle' | 'In Transit' | 'Maintenance';
  capacity: number;
  integrity: number;
  location: string;
}

export interface MailItem {
  id: string;
  sender: string;
  itemName: string;
  quantity: number;
  date: string;
  status: 'Ready' | 'In Transit' | 'Processing';
  storageLocation: 'Mailbox' | 'Fortress Warehouse' | 'Regional Depot';
}

export interface Company {
  id: string;
  name: string;
  owner: string;
  level: number;
  reputation: number; // 0-5 stars
  balance: number;
  routes: string[];
  employees: number;
  type: 'Transport' | 'Logistics' | 'Production';
}