export const AreaCardMenu = ({ title, description, image }) => {
  return (
    <div className="flex flex-col bg-white p-0 shadow-lg rounded-t-lg w-96">
      <img src={image} alt="Logo" className="rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
