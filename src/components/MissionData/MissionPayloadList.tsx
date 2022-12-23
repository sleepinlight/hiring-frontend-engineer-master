import { useEffect, useState } from "react";
import { Mission } from "../../shared/interfaces/Mission.interface";
import SortArrow from "../Icons/SortArrow";

export interface MissionPayloadListProps {
  missions: Mission[];
}

const MissionPayloadList: React.FC<MissionPayloadListProps> = (
  props: MissionPayloadListProps
) => {
  const [sortedMissions, setSortedMissions] = useState<Mission[]>([
    ...props.missions,
  ]);
  const [ascending, setAscending] = useState<boolean>(true);
  const [alphabetical, setAlphabetical] = useState<boolean>(true);

  useEffect((): void => {
    setSortedMissions([...props.missions]);
  }, [props.missions]);

  useEffect((): void => {
    const sortedArr = alphabetical
      ? [...props.missions].sort()
      : [...props.missions].sort().reverse();
    setSortedMissions(sortedArr);
  }, [alphabetical]);

  useEffect((): void => {
    const sortedArr = [...props.missions].sort((a: Mission, b: Mission) => {
      return ascending
        ? a.totalMass! - b.totalMass!
        : b.totalMass! - a.totalMass!;
    });
    setSortedMissions(sortedArr);
  }, [ascending]);

  return (
    <div className="max-h-60 my-8 mx-4 overflow-y-auto">
      <table className="table-fixed font-sans relative w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left uppercase text-xs">
            <th className="pb-5" onClick={() => setAlphabetical(!alphabetical)}>
              <span>
                Mission <SortArrow ascending={alphabetical} />
              </span>
            </th>
            <th className="pb-5" onClick={() => setAscending(!ascending)}>
              {" "}
              <span>
                Total Payload Mass <SortArrow ascending={ascending} />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMissions?.map((mission) => {
            return (
              <tr key={mission.id} className="border-b-2">
                <td
                  className="list-item my-2 mx-5"
                  style={{ color: mission.color }}
                >
                  <div className="truncate">
                    <span style={{ color: "black" }}>{mission.name}</span>
                  </div>
                </td>
                <td className="my-2 text-gray-400">
                  {mission.totalMass?.toLocaleString()} KG
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MissionPayloadList;
