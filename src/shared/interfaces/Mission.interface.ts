import { MissionPayload } from "./MissionPayload.interface";

export interface Mission {
  id: string;
  name: string;
  totalMass?: number;
  payloads: (MissionPayload | null)[];
}
