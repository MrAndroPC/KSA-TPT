// src/lib/thrusterSchema.ts
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Thruster {
  id: string;                     // e.g. "TranslateRight"
  location: Vec3;                 // meters, game coordinates
  exhaustDirection: Vec3;         // normalized, direction of exhaust
  controlMapCsv: string;          // values for <ControlMap CSV="...">
  thrustN: number;                // Newtons
  specificImpulseSeconds: number; // Isp
  minimumPulseTimeSeconds: number;
  volumetricExhaustId: string;    // e.g. "ApolloRcsVac"
  soundAction: string;            // usually "On"
  soundId: string;                // e.g. "DefaultRcsThruster"
  // ThrusterLight removed per design
}

export function makeDefaultThruster(index: number): Thruster {
  return {
    id: `Thruster${index}`,
    location: { x: 0, y: 0, z: 0 },
    exhaustDirection: { x: -1, y: 0, z: 0 }, // default: fire toward X-
    controlMapCsv: "TranslateRight",
    thrustN: 44.4,
    specificImpulseSeconds: 220,
    minimumPulseTimeSeconds: 0.008,
    volumetricExhaustId: "DefaultRcsVac",
    soundAction: "On",
    soundId: "DefaultRcsThruster",
  };
}
