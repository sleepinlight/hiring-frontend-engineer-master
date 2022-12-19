import { useEffect, useState } from "react";
import payloadData from "../dataset/missions.json";
import { Mission } from "../interfaces/Mission.interface";
import { MissionPayload } from "../interfaces/MissionPayload.interface";
import MissionPayloadList from "./MissionData/MissionPayloadList";
import NationalityDropdown from "./NationalityDropdown/NationalityDropdown";

export interface PayloadCardProps {}

const PayloadCard: React.FC<PayloadCardProps> = ({}: PayloadCardProps) => {
  const [missionData, setMissionData] = useState<Mission[]>(
    payloadData.data.missions
  );
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [filteredMissionData, setFilteredMissionData] = useState<Mission[]>(
    payloadData.data.missions
  );

  const calculateTotalMass = (mission: Mission): number => {
    const totalMass = mission.payloads.reduce(
      (a, b) => a + (b?.["payload_mass_kg"] || 0),
      0
    );
    return totalMass;
  };

  const parsePayloadAndSetData = (missions: Mission[]): void => {
    const foundNationalities: string[] = ["All Nations"];
    const missionsWithoutNullPayloads = [
      ...missions.map((mission) => {
        mission.payloads = mission.payloads.filter((payload) => {
          if (payload !== null) {
            foundNationalities.push(payload.nationality);
            return payload;
          }
        });
        mission.totalMass = calculateTotalMass(mission);
        return mission;
      }),
    ];
    setNationalities(Array.from(new Set(foundNationalities)));
    setMissionData(missionsWithoutNullPayloads);
  };

  const filterMissionsByNation = (nation: string): void => {
    const missionsByNation =
      nation.toLowerCase() !== "all nations"
        ? missionData.filter((m) =>
            m.payloads?.find(
              (p) => p?.nationality?.toLowerCase() === nation.toLowerCase()
            )
          )
        : missionData;
    setFilteredMissionData([...missionsByNation]);
  };

  useEffect(() => {
    parsePayloadAndSetData(payloadData.data.missions);
  }, []);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-1/3">
      <div className="flex flex-1 justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">97</span> results
        </p>
        <NationalityDropdown
          nationalities={nationalities}
          onNationalitySelected={(nation: string) =>
            filterMissionsByNation(nation)
          }
        ></NationalityDropdown>{" "}
      </div>
      <div>
        <MissionPayloadList missions={filteredMissionData}></MissionPayloadList>
      </div>
    </div>
  );
};

export default PayloadCard;
