import { MissionPayload } from "./MissionPayload.interface";

export interface Mission {
  id: string;
  name: string;
  payloads: (MissionPayload | null)[];
  totalMass?: number;
  color?: string;
}
