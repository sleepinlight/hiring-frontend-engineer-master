import { useEffect, useState } from "react";
import { Mission } from "../../shared/interfaces/Mission.interface";

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

  useEffect(() => {
    const sortedArr = alphabetical
      ? [...props.missions].sort()
      : [...props.missions].sort().reverse();
    setSortedMissions(sortedArr);
  }, [alphabetical]);

  useEffect(() => {
    const sortedArr = [...props.missions].sort((a: Mission, b: Mission) => {
      return ascending
        ? a.totalMass! - b.totalMass!
        : b.totalMass! - a.totalMass!;
    });
    setSortedMissions(sortedArr);
  }, [ascending]);

  return (
    <table className="my-16 table-fixed">
      <thead>
        <tr className="text-left">
          <th onClick={() => setAlphabetical(!alphabetical)}>Mission</th>
          <th onClick={() => setAscending(!ascending)}>Total Payload Mass</th>
        </tr>
      </thead>
      <tbody>
        {sortedMissions?.map((mission) => {
          return (
            <tr key={mission.id}>
              <td>
                <span className="truncate ...">{mission.name}</span>
              </td>
              <td>{mission.totalMass}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MissionPayloadList;
