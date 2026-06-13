import { useState } from "react";
import Equipment, { EdgeList, EquipmentStatus } from "./equipmentData";

const STAT_COLORS: Record<EquipmentStatus, string> = {
  ONLINE: "#10b981",
  ALARM: "#f59e0b",
  FAULT: "#ef4444",
  STANDBY: "#0ea5e9",
  OFFLINE: "#a3a3a3",
};

const SYM_HALF_H: Record<string, number> = {
  CircuitBreaker: 12, Transformer: 18, GridConnection: 12,
  MainPowerSupply: 12, Generator: 14, UPS: 18, Rack: 12,
  CoolingUnit: 12, Condenser: 12, Dehumidifier: 12,
  FireSystem: 12, Lighting: 12, Socket: 12, Fan: 12, ABS: 12, Spare: 12,
};

function pos(id: string) {
  const L: Record<string, { x: number; y: number }> = {
    mains: { x: 80, y: 30 },
    tx1: { x: 80, y: 85 }, tx1cb: { x: 80, y: 130 },
    gen1: { x: 210, y: 85 }, gen1cb: { x: 210, y: 130 },
    gen2: { x: 320, y: 85 }, gen2cb: { x: 320, y: 130 },
    "bus-main": { x: 645, y: 180 },
    ups1cb: { x: 80, y: 245 }, ups1: { x: 80, y: 310 },
    upsoutcb: { x: 80, y: 380 }, sbp: { x: 210, y: 245 },
    "it-bus1": { x: 390, y: 440 }, busway: { x: 470, y: 500 },
    epo1cb: { x: 80, y: 560 },
    dx1cb: { x: 450, y: 245 }, dx1: { x: 450, y: 310 },
    dx2cb: { x: 550, y: 245 }, dx2: { x: 550, y: 310 },
    dx3cb: { x: 650, y: 245 }, dx3: { x: 650, y: 310 },
    dx4cb: { x: 750, y: 245 }, dx4: { x: 750, y: 310 },
    rc1cb: { x: 450, y: 380 }, rc1: { x: 450, y: 440 },
    rc2cb: { x: 550, y: 380 }, rc2: { x: 550, y: 440 },
    rc3cb: { x: 650, y: 380 }, rc3: { x: 650, y: 440 },
    rc4cb: { x: 750, y: 380 }, rc4: { x: 750, y: 440 },
    dh1cb: { x: 870, y: 245 }, dh1: { x: 870, y: 310 },
    fc1cb: { x: 960, y: 245 }, fc1: { x: 960, y: 310 },
    lt1cb: { x: 1050, y: 245 }, lt1: { x: 1050, y: 310 },
    soccb: { x: 1140, y: 245 }, soc: { x: 1140, y: 310 },
    fn1cb: { x: 870, y: 380 }, fn1: { x: 870, y: 440 },
    ars1cb: { x: 960, y: 380 }, ars1: { x: 960, y: 440 },
    sp1cb: { x: 1050, y: 380 }, sp1: { x: 1050, y: 440 },
    rack1cb: { x: 280, y: 560 }, rack1: { x: 280, y: 620 },
    rack2cb: { x: 335, y: 560 }, rack2: { x: 335, y: 620 },
    rack3cb: { x: 390, y: 560 }, rack3: { x: 390, y: 620 },
    rack4cb: { x: 445, y: 560 }, rack4: { x: 445, y: 620 },
    rack5cb: { x: 500, y: 560 }, rack5: { x: 500, y: 620 },
    rack6cb: { x: 555, y: 560 }, rack6: { x: 555, y: 620 },
    rack7cb: { x: 610, y: 560 }, rack7: { x: 610, y: 620 },
    rack8cb: { x: 665, y: 560 }, rack8: { x: 665, y: 620 },
    rack9cb: { x: 720, y: 560 }, rack9: { x: 720, y: 620 },
    rack10cb: { x: 775, y: 560 }, rack10: { x: 775, y: 620 },
    rack11cb: { x: 830, y: 560 }, rack11: { x: 830, y: 620 },
    rack12cb: { x: 885, y: 560 }, rack12: { x: 885, y: 620 },
  };
  return L[id] ?? { x: 0, y: 0 };
}

const ACTIVE_TYPES = new Set(["Busbar", "Busway"]);

function isActive(id: string, statuses: Record<string, EquipmentStatus>) {
  const eq = Equipment.find(e => e.id === id);
  if (!eq) return false;
  if (ACTIVE_TYPES.has(eq.equipmentType)) return true;
  const s = statuses[id] ?? eq.status;
  return s !== "FAULT" && s !== "OFFLINE";
}

function GndSym({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={-80} y1={-9} x2={80} y2={-9} stroke={color} strokeWidth={7} strokeLinecap="round" />
      <line x1={0} y1={-9} x2={0} y2={12} stroke={color} strokeWidth={2} />
    </g>
  );
}

function TrfSym({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={0} y1={-18} x2={0} y2={-12} stroke={color} strokeWidth={2} />
      <circle cx={-6} cy={-6} r={5} fill="none" stroke={color} strokeWidth={1.5} />
      <circle cx={6} cy={-6} r={5} fill="none" stroke={color} strokeWidth={1.5} />
      <circle cx={0} cy={6} r={5} fill="none" stroke={color} strokeWidth={1.5} />
      <line x1={0} y1={11} x2={0} y2={18} stroke={color} strokeWidth={2} />
    </g>
  );
}

function CbSym({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={0} y1={-12} x2={0} y2={-6} stroke={color} strokeWidth={2} />
      <circle cx={0} cy={0} r={6} fill="none" stroke={color} strokeWidth={2} />
      <line x1={-4} y1={-4} x2={4} y2={4} stroke={color} strokeWidth={2} />
      <line x1={0} y1={6} x2={0} y2={12} stroke={color} strokeWidth={2} />
    </g>
  );
}

function GenSym({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={0} cy={0} r={14} fill="none" stroke={color} strokeWidth={2} />
      <path d="M-6,-4 Q0,-10 6,-4 Q0,-6 -6,-4" fill="none" stroke={color} strokeWidth={1.5} />
      <line x1={0} y1={14} x2={0} y2={18} stroke={color} strokeWidth={2} />
    </g>
  );
}

function UpsSym({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={0} y1={-18} x2={0} y2={-14} stroke={color} strokeWidth={2} />
      <rect x={-18} y={-14} width={36} height={28} rx={2} fill="none" stroke={color} strokeWidth={2} />
      <text x={0} y={4} textAnchor="middle" fontSize={10} fontWeight="700" fill={color}>UPS</text>
      <line x1={0} y1={14} x2={0} y2={18} stroke={color} strokeWidth={2} />
    </g>
  );
}

function LoadSym({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={0} y1={-12} x2={0} y2={-7} stroke={color} strokeWidth={2} />
      <circle cx={0} cy={0} r={10} fill="none" stroke={color} strokeWidth={2} />
    </g>
  );
}

function RackSym({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={0} y1={-12} x2={0} y2={-7} stroke={color} strokeWidth={2} />
      <circle cx={0} cy={0} r={10} fill="none" stroke={color} strokeWidth={2} />
      <line x1={-5} y1={-3} x2={5} y2={-3} stroke={color} strokeWidth={1.5} />
      <line x1={-5} y1={2} x2={5} y2={2} stroke={color} strokeWidth={1.5} />
    </g>
  );
}

function HitArea({ x, y, onClick }: { x: number; y: number; onClick: () => void }) {
  return (
    <circle cx={x} cy={y} r={18} fill="transparent" style={{ cursor: "pointer" }} onClick={onClick} />
  );
}

function EqSymbol({ eq, status, selected, onClick }: {
  eq: typeof Equipment[number]; status: EquipmentStatus;
  selected: boolean; onClick: () => void;
}) {
  const p = pos(eq.id);
  const color = STAT_COLORS[status];

  const inner = (() => {
    switch (eq.equipmentType) {
      case "MainPowerSupply":
        return <GndSym x={p.x} y={p.y} color={color} />;
      case "Transformer":
        return <TrfSym x={p.x} y={p.y} color={color} />;
      case "CircuitBreaker":
        return <CbSym x={p.x} y={p.y} color={color} />;
      case "Generator":
        return <GenSym x={p.x} y={p.y} color={color} />;
      case "UPS":
        return <UpsSym x={p.x} y={p.y} color={color} />;
      case "Rack":
        return <RackSym x={p.x} y={p.y} color={color} />;
      default:
        return <LoadSym x={p.x} y={p.y} color={color} />;
    }
  })();

  return (
    <g>
      {selected && (
        <circle cx={p.x} cy={p.y} r={22} fill="none" stroke="#ff682c" strokeWidth={2} strokeDasharray="4 3" opacity={0.7} />
      )}
      <HitArea x={p.x} y={p.y} onClick={onClick} />
      {inner}
      <text x={p.x} y={p.y + 24} textAnchor="middle" fontSize={7} fill="#4d4d4d" fontWeight="600" fontFamily="system-ui">
        {eq.name}
      </text>
    </g>
  );
}

function BusBarLine({ x1, x2, y, label, sw }: { x1: number; x2: number; y: number; label: string; sw: number }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="#475569" strokeWidth={sw} strokeLinecap="round" />
      <rect x={x1} y={y - 3} width={x2 - x1} height={6} fill="transparent" />
      <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle" fontSize={8} fontWeight="700" fill="#475569" fontFamily="system-ui">
        {label}
      </text>
    </g>
  );
}

function getBusSpan(busId: string, activeIds: Set<string>) {
  const connected = EdgeList
    .filter(e => (e.source === busId || e.target === busId) && activeIds.has(e.source) && activeIds.has(e.target))
    .flatMap(e => [e.source === busId ? e.target : e.source]);
  if (!connected.length) return { min: 0, max: 0 };
  const xs = connected.map(id => pos(id).x);
  return { min: Math.min(...xs) - 30, max: Math.max(...xs) + 30 };
}

function EdgeLine({ edge, color }: { edge: typeof EdgeList[number]; color: string }) {
  const src = pos(edge.source), tgt = pos(edge.target);
  const srcEq = Equipment.find(e => e.id === edge.source);
  const tgtEq = Equipment.find(e => e.id === edge.target);
  const srcH = SYM_HALF_H[srcEq?.equipmentType ?? ""] ?? 12;
  const tgtH = SYM_HALF_H[tgtEq?.equipmentType ?? ""] ?? 12;
  const isBus = (id: string) => ["bus-main", "it-bus1", "busway"].includes(id);
  const sBus = isBus(edge.source), tBus = isBus(edge.target);

  let pathD: string;
  if (sBus && tBus) {
    pathD = `M80,${src.y} L80,${tgt.y}`;
  } else if (sBus) {
    pathD = `M${tgt.x},${src.y} L${tgt.x},${tgt.y - tgtH}`;
  } else if (tBus) {
    pathD = `M${src.x},${src.y + srcH} L${src.x},${tgt.y}`;
  } else if (src.y < tgt.y) {
    if (src.x !== tgt.x) {
      const midY = (src.y + srcH + tgt.y - tgtH) / 2;
      pathD = `M${src.x},${src.y + srcH} L${src.x},${midY} L${tgt.x},${midY} L${tgt.x},${tgt.y - tgtH}`;
    } else {
      pathD = `M${src.x},${src.y + srcH} L${tgt.x},${tgt.y - tgtH}`;
    }
  } else {
    if (src.x !== tgt.x) {
      const midY = (src.y - srcH + tgt.y + tgtH) / 2;
      pathD = `M${src.x},${src.y - srcH} L${src.x},${midY} L${tgt.x},${midY} L${tgt.x},${tgt.y + tgtH}`;
    } else {
      pathD = `M${src.x},${src.y - srcH} L${tgt.x},${tgt.y + tgtH}`;
    }
  }

  return <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} />;
}

const STATUS_LIST: EquipmentStatus[] = ["ONLINE", "STANDBY", "ALARM", "FAULT", "OFFLINE"];

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const statuses: Record<string, EquipmentStatus> = {};
  Equipment.forEach(e => statuses[e.id] = e.status);

  const activeIds = new Set(Equipment.filter(e => isActive(e.id, statuses)).map(e => e.id));
  const busIds = new Set(["bus-main", "it-bus1", "busway"]);
  busIds.forEach(id => activeIds.add(id));

  const visibleEquipment = Equipment.filter(e => activeIds.has(e.id));
  const visibleEdges = EdgeList.filter(e => activeIds.has(e.source) && activeIds.has(e.target));
  const visibleEqSet = new Set(visibleEquipment.map(e => e.id));

  const bmS = getBusSpan("bus-main", visibleEqSet);
  const ibS = getBusSpan("it-bus1", visibleEqSet);
  const bwS = getBusSpan("busway", visibleEqSet);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto", background: "#f0f2f5", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #d0d5dd", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <strong style={{ fontSize: 18, color: "#1a1a1a" }}>Electrical Safety Training — SLD</strong>
        <span style={{ fontSize: 13, color: "#667085" }}>click any device to highlight</span>
        {selectedId && (
          <span style={{ marginLeft: "auto", fontSize: 13, color: "#1a1a1a" }}>
            Selected: <strong>{Equipment.find(e => e.id === selectedId)?.name ?? selectedId}</strong>
          </span>
        )}
        <div style={{ marginLeft: selectedId ? 0 : "auto", display: "flex", gap: 12, alignItems: "center" }}>
          {STATUS_LIST.map(s => (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#667085" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: STAT_COLORS[s], display: "inline-block" }} />
              {s}
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
        <svg viewBox="0 0 1300 680" width={1300} height={680} style={{ display: "block", background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <BusBarLine x1={bmS.min} x2={bmS.max} y={180} label="MAIN BUS 400A" sw={3.5} />
          <BusBarLine x1={ibS.min} x2={ibS.max} y={440} label="IT BUS-1" sw={3} />
          <BusBarLine x1={bwS.min} x2={bwS.max} y={500} label="160A Busway" sw={2.5} />

          {visibleEdges.map(e => (
            <EdgeLine key={e.id} edge={e} color="#94a3b8" />
          ))}

          {visibleEquipment.map(eq => {
            const status = statuses[eq.id] ?? eq.status;
            const selected = eq.id === selectedId;
            return (
              <EqSymbol
                key={eq.id}
                eq={eq}
                status={status}
                selected={selected}
                onClick={() => setSelectedId(eq.id === selectedId ? null : eq.id)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
