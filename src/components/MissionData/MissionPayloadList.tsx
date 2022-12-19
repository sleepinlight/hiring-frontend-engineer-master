import { Mission } from "../../interfaces/Mission.interface";

export interface MissionPayloadListProps {
  missions: Mission[];
}

const MissionPayloadList: React.FC<MissionPayloadListProps> = (
  props: MissionPayloadListProps
) => {
  return (
    <table className="my-16 table-fixed">
      <thead>
        <tr>
          <th>Mission</th>
        </tr>
      </thead>
      <tbody>
        {props.missions.map((mission) => {
          return (
            <tr key={mission.id}>
              <td>{mission.name}</td>
              <td>{mission.totalMass}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MissionPayloadList;
