import { createContext, useReducer, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { matchesService } from '../services/matches.service';

export const MatchContext = createContext(null);

const ACTIONS = {
    MATCH_LOADED: 'MATCH_LOADED',
    PLAYER_JOINED: 'PLAYER_JOINED',
    PLAYER_MOVED: 'PLAYER_MOVED',
    TURN_ENDED: 'TURN_ENDED',
    MATCH_ENDED: 'MATCH_ENDED'
};

const initialState = {
    match: {
        user1: null,
        user2: null,
        turns: [],
        winner: undefined
    },
    currentTurn: 1,
    matchStatus: 'loading',
    turnStatus: 'initial',
};

function matchReducer(state, action) {
    switch (action.type) {
        case ACTIONS.MATCH_LOADED:
            return {
                ...state,
                match: action.payload,
                matchStatus: action.payload.user2 ? 'playing' : 'waiting',
                currentTurn: action.payload.turns.length + 1
            };

        case ACTIONS.PLAYER_JOINED:
            return {
                ...state,
                match: {
                    ...state.match,
                    user2: {
                        username: action.payload.user
                    }
                },
                matchStatus: 'playing'
            };

        case ACTIONS.PLAYER_MOVED: {
            const currentTurnData = state.match ? state.match.turns?.[state.currentTurn - 1] : {};
            const updatedTurn = { ...currentTurnData };

            if (action.payload.user === "user1") {
                updatedTurn.user1 = action.payload.move;
            } else {
                updatedTurn.user2 = action.payload.move;
            }

            const updatedTurns = [...state.match.turns];
            updatedTurns[state.currentTurn - 1] = updatedTurn;

            return {
                ...state,
                match: {
                    ...state.match,
                    turns: updatedTurns
                },
                turnStatus: 'waiting'
            };
        }

        case ACTIONS.TURN_ENDED:
            return {
                ...state,
                currentTurn: state.currentTurn + 1,
                turnStatus: 'initial'
            };

        case ACTIONS.MATCH_ENDED:
            return {
                ...state,
                matchStatus: 'end',
                match: {
                    ...state.match,
                    winner: action.payload.winner
                }
            };

        default:
            return state;
    }
}

export const MatchProvider = ({ children, matchId }) => {
    const [state, dispatch] = useReducer(matchReducer, initialState);

    const { isLoading, isError } = useQuery({
        queryKey: ['matches', matchId],
        queryFn: () => matchesService.getMatch(matchId),
        enabled: !!matchId,
        onSuccess: (data) => {
            dispatch({ type: ACTIONS.MATCH_LOADED, payload: data });
        }
    });

    const value = {
        state,
        dispatch,
        isLoading,
        isError,
        ACTIONS
    };

    return (
        <MatchContext.Provider value={value}>
            {children}
        </MatchContext.Provider>
    );
}