type DescriptionComponentProps = {
  selectedLocation: string;
  description: string;
};

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  selectedLocation,
  description,
}) => {
  return (
    <div style={{ padding: "10 px" }}>
      <h2 style={{ fontWeight: "bolder" }}>{selectedLocation}</h2>
      <p>{description}</p>
    </div>
  );
};

export default DescriptionComponent;
