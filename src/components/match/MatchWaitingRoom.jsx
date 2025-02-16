import { CircularProgress } from "@mui/material";

const MatchWaitingRoom = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <CircularProgress />
    <p className="mt-4 text-lg">En attente d'un adversaire...</p>
  </div>
);

export default MatchWaitingRoom;
