import { useEffect, useState } from "react";
import payloadData from "../dataset/missions.json";
import { Mission } from "../shared/interfaces/Mission.interface";
import { MissionPayload } from "../shared/interfaces/MissionPayload.interface";
import DonutChart from "./DonutChart/DonutChart";
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
    return mission.payloads.reduce(
      (a, b) => a + (b?.["payload_mass_kg"] || 0),
      0
    );
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

  useEffect((): void => {
    parsePayloadAndSetData(payloadData.data.missions);
  }, []);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg mx-auto w-2/5 mt-8">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Total Payload Per Mission
        </h3>
        <NationalityDropdown
          nationalities={nationalities}
          onNationalitySelected={(nation: string) =>
            filterMissionsByNation(nation)
          }
        ></NationalityDropdown>
      </div>
      <div className="border-t border-gray-200">
        <div className="flex justify-around">
          <div className="w-1/2 p-16 align-middle">
            <DonutChart missions={filteredMissionData}></DonutChart>
          </div>
          <MissionPayloadList
            missions={filteredMissionData}
          ></MissionPayloadList>
        </div>
      </div>
    </div>
  );
};

export default PayloadCard;
