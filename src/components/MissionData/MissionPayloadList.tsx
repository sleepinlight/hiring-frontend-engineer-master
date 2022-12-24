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
  const [ascending, setAscending] = useState<boolean | null>(null);
  const [alphabetical, setAlphabetical] = useState<boolean | null>(null);

  useEffect((): void => {
    setSortedMissions([...props.missions]);
  }, [props.missions]);

  const getSortState = (currentState: boolean | null): boolean | null => {
    switch (currentState) {
      case null:
        return true;
        break;
      case true:
        return false;
        break;
      case false:
        return null;
        break;
    }
  };

  const onSortByName = (): Mission[] => {
    const sortState = getSortState(alphabetical);
    setAlphabetical(sortState);
    setAscending(null);
    if (sortState === null) {
      return [...props.missions];
    }
    return [...props.missions].sort((a: Mission, b: Mission) => {
      return sortState
        ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        : b.name.toLowerCase().localeCompare(a.name.toLowerCase());
    });
  };

  const onSortByTotalMass = (): Mission[] => {
    const sortState = getSortState(ascending);
    setAscending(sortState);
    setAlphabetical(null);
    if (sortState === null) {
      return [...props.missions];
    }
    return [...props.missions].sort((a: Mission, b: Mission) => {
      return sortState
        ? a.totalMass! - b.totalMass!
        : b.totalMass! - a.totalMass!;
    });
  };

  return (
    <div className="max-h-60 my-8 mx-4 overflow-y-auto">
      <table className="table-fixed font-sans relative w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left uppercase text-xs">
            <th
              className="pb-5 truncate"
              onClick={() => setSortedMissions(onSortByName())}
            >
              <span>
                Mission{" "}
                {alphabetical !== null && (
                  <SortArrow ascending={Boolean(alphabetical)} />
                )}
              </span>
            </th>
            <th
              className="pb-5 truncate"
              onClick={() => setSortedMissions(onSortByTotalMass())}
            >
              {" "}
              <span>
                Total Payload Mass{" "}
                {ascending !== null && (
                  <SortArrow ascending={Boolean(ascending)} />
                )}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMissions?.map((mission) => {
            return (
              <tr key={mission.id} className="border-b-2 text-sm">
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
