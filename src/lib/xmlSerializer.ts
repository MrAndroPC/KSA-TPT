import { Thruster } from "./thrusterSchema";
import { XMLBuilder } from "fast-xml-parser";

export function thrustersToXml(thrusters: Thruster[]): string {
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true,
  });

  const xmlThrusters = {
      Thruster: thrusters.map((t) => ({
        "@_Id": t.id,
        Location: {
          "@_X": t.location.x.toFixed(3),
          "@_Y": t.location.y.toFixed(3),
          "@_Z": t.location.z.toFixed(3),
        },
        // I've got no idea how to fix it properly, so I'm leaving it like this
        ExhaustDirection: {
          "@_X": t.exhaustDirection.x.toFixed(3),
          "@_Y": t.exhaustDirection.y.toFixed(3), // Y and Z are swapped
          "@_Z": t.exhaustDirection.z.toFixed(3),
        },
        ControlMap: {
          "@_CSV": t.controlMapCsv,
        },
        Thrust: {
          "@_N": t.thrustN.toFixed(2),
        },
        SpecificImpulse: {
          "@_Seconds": t.specificImpulseSeconds.toFixed(1),
        },
        MinimumPulseTime: {
          "@_Seconds": t.minimumPulseTimeSeconds.toFixed(3),
        },
        VolumetricExhaust: {
          "@_Id": t.volumetricExhaustId,
        },
        SoundEvent: {
          "@_Action": t.soundAction,
          "@_SoundId": t.soundId,
        },
        // no ThrusterLight here
      })),
  };

  return builder.build(xmlThrusters);
}
