export type EquipmentStatus = "ONLINE" | "ALARM" | "FAULT" | "STANDBY" | "OFFLINE";

export type EquipmentItem = {
  id: string;
  equipmentType: string;
  name: string;
  status: EquipmentStatus;
  voltage?: string;
  rating?: string;
};

export type EquipmentEdge = {
  id: string;
  source: string;
  target: string;
  type?: "PowerFeed" | "Bypass";
};

const Equipment: EquipmentItem[] = [
  { id: "mains", equipmentType: "MainPowerSupply", name: "Main Power", status: "ONLINE", voltage: "11kV" },
  { id: "tx1", equipmentType: "Transformer", name: "TX-1", status: "ONLINE", voltage: "11/0.4kV", rating: "300kVA" },
  { id: "tx1cb", equipmentType: "CircuitBreaker", name: "TX-1 Breaker", status: "ONLINE", rating: "400A" },
  { id: "gen1", equipmentType: "Generator", name: "GEN-1", status: "STANDBY", rating: "300kVA" },
  { id: "gen1cb", equipmentType: "CircuitBreaker", name: "GEN-1 Breaker", status: "STANDBY", rating: "400A" },
  { id: "gen2", equipmentType: "Generator", name: "GEN-2", status: "STANDBY", rating: "300kVA" },
  { id: "gen2cb", equipmentType: "CircuitBreaker", name: "GEN-2 Breaker", status: "STANDBY", rating: "400A" },
  { id: "bus-main", equipmentType: "Busbar", name: "MAIN BUS 400A", status: "ONLINE", rating: "400A, 400V" },
  { id: "ups1cb", equipmentType: "CircuitBreaker", name: "UPS-1 Breaker", status: "ONLINE", rating: "160A" },
  { id: "ups1", equipmentType: "UPS", name: "UPS", status: "ONLINE", rating: "96kW" },
  { id: "upsoutcb", equipmentType: "CircuitBreaker", name: "UPS Output Br.", status: "ONLINE", rating: "160A" },
  { id: "sbp", equipmentType: "CircuitBreaker", name: "SBP Bypass", status: "STANDBY", rating: "160A" },
  { id: "it-bus1", equipmentType: "Busbar", name: "IT BUS-1", status: "ONLINE", rating: "400/230V" },
  { id: "busway", equipmentType: "Busway", name: "160A Busway", status: "ONLINE", rating: "160A" },
  { id: "epo1cb", equipmentType: "CircuitBreaker", name: "EPO-1 Breaker", status: "ONLINE", rating: "160A" },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `rack${i + 1}cb`, equipmentType: "CircuitBreaker" as const,
    name: `Rack ${i + 1} Br.`, status: "ONLINE" as EquipmentStatus, rating: "32A",
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `rack${i + 1}`, equipmentType: "Rack" as const,
    name: `Rack ${i + 1}`, status: (i === 4 ? "ALARM" : "ONLINE") as EquipmentStatus, rating: "7.5kW",
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `dx${i + 1}cb`, equipmentType: "CircuitBreaker" as const,
    name: `DX-${i + 1} Br.`, status: "ONLINE" as EquipmentStatus, rating: "35A",
  })),
  { id: "dx1", equipmentType: "CoolingUnit", name: "DX-1 / ACRD602P-1", status: "ONLINE", rating: "34kW" },
  { id: "dx2", equipmentType: "CoolingUnit", name: "DX-2 / ACRD602P-2", status: "ONLINE", rating: "34kW" },
  { id: "dx3", equipmentType: "CoolingUnit", name: "DX-3 / ACRD602P-3", status: "ONLINE", rating: "34kW" },
  { id: "dx4", equipmentType: "CoolingUnit", name: "DX-4 / ACRD602P-4", status: "ALARM", rating: "34kW" },
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `rc${i + 1}cb`, equipmentType: "CircuitBreaker" as const,
    name: `RC-${i + 1} Br.`, status: "ONLINE" as EquipmentStatus, rating: "25A",
  })),
  { id: "rc1", equipmentType: "Condenser", name: "RC-1", status: "ONLINE" },
  { id: "rc2", equipmentType: "Condenser", name: "RC-2", status: "ONLINE" },
  { id: "rc3", equipmentType: "Condenser", name: "RC-3", status: "ONLINE" },
  { id: "rc4", equipmentType: "Condenser", name: "RC-4", status: "ONLINE" },
  { id: "dh1cb", equipmentType: "CircuitBreaker", name: "DH-1 Br.", status: "ONLINE", rating: "16A" },
  { id: "dh1", equipmentType: "Dehumidifier", name: "DH-1 Dehumid.", status: "ONLINE" },
  { id: "fc1cb", equipmentType: "CircuitBreaker", name: "FC-1 Br.", status: "ONLINE", rating: "16A" },
  { id: "fc1", equipmentType: "FireSystem", name: "FC-1 Fire Sys.", status: "ONLINE" },
  { id: "lt1cb", equipmentType: "CircuitBreaker", name: "LT-1 Br.", status: "ONLINE", rating: "16A" },
  { id: "lt1", equipmentType: "Lighting", name: "LT-1 Lighting", status: "ONLINE" },
  { id: "soccb", equipmentType: "CircuitBreaker", name: "SOC Br.", status: "ONLINE", rating: "16A" },
  { id: "soc", equipmentType: "Socket", name: "SOC Sockets", status: "ONLINE" },
  { id: "fn1cb", equipmentType: "CircuitBreaker", name: "FN-1 Br.", status: "ONLINE", rating: "16A" },
  { id: "fn1", equipmentType: "Fan", name: "FN-1 Fan", status: "ONLINE" },
  { id: "ars1cb", equipmentType: "CircuitBreaker", name: "ARS-1 Br.", status: "ONLINE", rating: "16A" },
  { id: "ars1", equipmentType: "ABS", name: "ARS-1 ABS", status: "ONLINE" },
  { id: "sp1cb", equipmentType: "CircuitBreaker", name: "SP-1 Br.", status: "OFFLINE", rating: "16A" },
  { id: "sp1", equipmentType: "Spare", name: "SP-1 Spare", status: "OFFLINE" },
];

export default Equipment;

export const EdgeList: EquipmentEdge[] = [
  { id: "e-mains-tx", source: "mains", target: "tx1", type: "PowerFeed" },
  { id: "e-tx-tx1cb", source: "tx1", target: "tx1cb", type: "PowerFeed" },
  { id: "e-tx1cb-bus", source: "tx1cb", target: "bus-main", type: "PowerFeed" },
  { id: "e-gen1-gen1cb", source: "gen1", target: "gen1cb", type: "PowerFeed" },
  { id: "e-gen1cb-bus", source: "gen1cb", target: "bus-main", type: "PowerFeed" },
  { id: "e-gen2-gen2cb", source: "gen2", target: "gen2cb", type: "PowerFeed" },
  { id: "e-gen2cb-bus", source: "gen2cb", target: "bus-main", type: "PowerFeed" },
  { id: "e-bus-ups1cb", source: "bus-main", target: "ups1cb", type: "PowerFeed" },
  { id: "e-ups1cb-ups1", source: "ups1cb", target: "ups1", type: "PowerFeed" },
  { id: "e-ups1-upsoutcb", source: "ups1", target: "upsoutcb", type: "PowerFeed" },
  { id: "e-upsoutcb-itbus1", source: "upsoutcb", target: "it-bus1", type: "PowerFeed" },
  { id: "e-bus-sbp", source: "bus-main", target: "sbp", type: "Bypass" },
  { id: "e-sbp-itbus1", source: "sbp", target: "it-bus1", type: "Bypass" },
  { id: "e-itbus1-busway", source: "it-bus1", target: "busway", type: "PowerFeed" },
  { id: "e-busway-epo1cb", source: "busway", target: "epo1cb", type: "PowerFeed" },
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `e-busway-r${i + 1}cb`, source: "busway", target: `rack${i + 1}cb`, type: "PowerFeed" as const,
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `e-r${i + 1}cb-r${i + 1}`, source: `rack${i + 1}cb`, target: `rack${i + 1}`, type: "PowerFeed" as const,
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `e-bus-dx${i + 1}cb`, source: "bus-main", target: `dx${i + 1}cb`, type: "PowerFeed" as const,
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `e-dx${i + 1}cb-dx${i + 1}`, source: `dx${i + 1}cb`, target: `dx${i + 1}`, type: "PowerFeed" as const,
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `e-bus-rc${i + 1}cb`, source: "bus-main", target: `rc${i + 1}cb`, type: "PowerFeed" as const,
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `e-rc${i + 1}cb-rc${i + 1}`, source: `rc${i + 1}cb`, target: `rc${i + 1}`, type: "PowerFeed" as const,
  })),
  { id: "e-bus-dh1cb", source: "bus-main", target: "dh1cb", type: "PowerFeed" },
  { id: "e-dh1cb-dh1", source: "dh1cb", target: "dh1", type: "PowerFeed" },
  { id: "e-bus-fc1cb", source: "bus-main", target: "fc1cb", type: "PowerFeed" },
  { id: "e-fc1cb-fc1", source: "fc1cb", target: "fc1", type: "PowerFeed" },
  { id: "e-bus-lt1cb", source: "bus-main", target: "lt1cb", type: "PowerFeed" },
  { id: "e-lt1cb-lt1", source: "lt1cb", target: "lt1", type: "PowerFeed" },
  { id: "e-bus-soccb", source: "bus-main", target: "soccb", type: "PowerFeed" },
  { id: "e-soccb-soc", source: "soccb", target: "soc", type: "PowerFeed" },
  { id: "e-bus-fn1cb", source: "bus-main", target: "fn1cb", type: "PowerFeed" },
  { id: "e-fn1cb-fn1", source: "fn1cb", target: "fn1", type: "PowerFeed" },
  { id: "e-bus-ars1cb", source: "bus-main", target: "ars1cb", type: "PowerFeed" },
  { id: "e-ars1cb-ars1", source: "ars1cb", target: "ars1", type: "PowerFeed" },
  { id: "e-bus-sp1cb", source: "bus-main", target: "sp1cb", type: "PowerFeed" },
  { id: "e-sp1cb-sp1", source: "sp1cb", target: "sp1", type: "PowerFeed" },
];
