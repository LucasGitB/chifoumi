import React from 'react';
import { CircularProgress } from '@mui/material';

const MatchWaitingOpponentTurn = ({ playerMove, opponentName }) => {
    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
            <div className="text-lg text-green-600 font-medium">
                Vous avez joué {playerMove}
            </div>

            <div className="flex items-center gap-2 ">
                <CircularProgress size={24} color="primary" />
                <span>En attente du coup de {opponentName}...</span>
            </div>

            <div className="flex flex-col items-center mt-4">
                <div className="flex flex-row gap-8">
                    <div className="bg-green-100 p-3 rounded-lg">
                        Vous : ✓
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                        {opponentName} : ...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchWaitingOpponentTurn;