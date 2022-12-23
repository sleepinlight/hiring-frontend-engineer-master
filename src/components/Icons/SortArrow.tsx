export interface SortArrowProps {
  ascending: boolean;
}

const SortArrow: React.FC<SortArrowProps> = (props: SortArrowProps) => {
  const directionalString = props.ascending
    ? "M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
    : "M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75";

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 inline align-bottom"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={directionalString}
        />
      </svg>
    </>
  );
};

export default SortArrow;
