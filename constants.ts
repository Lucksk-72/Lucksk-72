import { Item, MapPoint, PlayerStats, TransportJob, TransportVehicle, Rarity, MailItem, Company } from './types';

export const MOCK_PLAYER: PlayerStats = {
  level: 14,
  xp: 3450,
  maxXp: 5000,
  health: 85,
  maxHealth: 100,
  energy: 42,
  maxEnergy: 100,
  credits: 12450,
  role: 'Logistics',
  address: 'CMDR_Alfa7_BOX42'
};

export const MARKET_ITEMS: Item[] = [
  { id: '1', name: 'Pasta Nutritiva', type: 'Consumable', rarity: Rarity.COMMON, basePrice: 10, currentPrice: 12, quantity: 45, description: 'Sustento básico para soldados.', trend: 'up' },
  { id: '2', name: 'Sucata Metálica', type: 'Material', rarity: Rarity.COMMON, basePrice: 25, currentPrice: 22, quantity: 120, description: 'Matéria-prima para artesanato básico.', trend: 'down' },
  { id: '3', name: 'Célula de Plasma', type: 'Resource', rarity: Rarity.RARE, basePrice: 150, currentPrice: 185, quantity: 5, description: 'Fonte de munição de alta energia.', trend: 'up' },
  { id: '4', name: 'Kit Médico V1', type: 'Consumable', rarity: Rarity.COMMON, basePrice: 50, currentPrice: 50, quantity: 3, description: 'Restaura 50 PV.', trend: 'stable' },
  { id: '5', name: 'Chip Quântico', type: 'Material', rarity: Rarity.EPIC, basePrice: 1000, currentPrice: 1200, quantity: 0, description: 'Essencial para logística high-tech.', trend: 'up' },
];

export const MAP_POINTS: MapPoint[] = [
  { id: 'p1', x: 50, y: 50, type: 'Ally', name: 'Você', distance: 0, faction: 'Allied' },
  { id: 'p2', x: 20, y: 30, type: 'Fortress', name: 'Setor 7 Alfa', distance: 1.2, faction: 'Allied' },
  { id: 'p3', x: 80, y: 20, type: 'Enemy', name: 'Saqueador Renegado', distance: 0.8, faction: 'Hostile' },
  { id: 'p4', x: 60, y: 70, type: 'Resource', name: 'Fábrica Velha', distance: 0.4, faction: 'Neutral' },
  { id: 'p5', x: 30, y: 80, type: 'Market', name: 'Hub Comercial 4', distance: 2.1, faction: 'Neutral' },
  { id: 'p6', x: 85, y: 85, type: 'Warehouse', name: 'Depósito Nexus Log', distance: 3.5, faction: 'Neutral' },
];

export const TRANSPORT_JOBS: TransportJob[] = [
  { id: 'j1', company: 'Nexus Logistics', origin: 'Hub Comercial 4', destination: 'Setor 7 Alfa', cargo: 'Suprimentos Médicos', volume: 50, reward: 350, risk: 'Low', distance: '3.2km', deadline: '2h', providerType: 'NPC_Corp' },
  { id: 'j2', company: 'Shadow Runners', origin: 'Fábrica Velha', destination: 'Local Confidencial', cargo: 'Minério Bruto', volume: 200, reward: 1200, risk: 'High', distance: '8.5km', deadline: '6h', providerType: 'NPC_Corp' },
  { id: 'j3', company: 'Quantum Express', origin: 'Estação Central', destination: 'Posto Norte', cargo: 'Drives de Dados', volume: 10, reward: 800, risk: 'Medium', distance: '12km', deadline: '45m', providerType: 'Player' },
];

export const MY_VEHICLES: TransportVehicle[] = [
  { id: 'v1', name: 'Cyber-Moto X1', type: 'Bike', status: 'Idle', capacity: 40, integrity: 95, location: 'Setor 7 Alfa' },
  { id: 'v2', name: 'Cargueiro Pesado Mk.II', type: 'Truck', status: 'In Transit', capacity: 500, integrity: 78, location: 'A caminho do Hub 4' },
];

export const CHART_DATA = [
  { name: '08:00', price: 100 },
  { name: '10:00', price: 120 },
  { name: '12:00', price: 115 },
  { name: '14:00', price: 140 },
  { name: '16:00', price: 135 },
  { name: '18:00', price: 160 },
];

export const MY_MAIL: MailItem[] = [
  { id: 'm1', sender: 'Admin do Sistema', itemName: 'Pacote de Boas-vindas', quantity: 1, date: '2025-05-10', status: 'Ready', storageLocation: 'Mailbox' },
  { id: 'm2', sender: 'Trader_Ze_99', itemName: 'Sucata Metálica', quantity: 50, date: '2025-05-11', status: 'Ready', storageLocation: 'Fortress Warehouse' },
  { id: 'm3', sender: 'Nexus Logistics', itemName: 'Peças de Motor', quantity: 2, date: '2025-05-12', status: 'In Transit', storageLocation: 'Regional Depot' },
];

export const MY_COMPANY: Company = {
  id: 'c1',
  name: 'Viajantes do Vazio',
  owner: 'CMDR_Alfa7',
  level: 3,
  reputation: 4.2,
  balance: 5600,
  routes: ['Set7 -> Hub4', 'Hub4 -> PostoNorte'],
  employees: 12,
  type: 'Transport'
};