import {createContext, useCallback, useEffect, useReducer} from "react";
import {INITIAL_STATE, STEPS_ACTIONS, stepsReducer} from "../reducers/stepsReducer";
import {getStopsListRequest} from "../services/api/stepsService";

export const StepsContext = createContext({
    isStepsLoading: true,
    stopsList: [],
    openedStepId: 0,
    setOpenedStepId: () => {
    },
    setCompletedStop: () => {
    },
});

export const StepsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(stepsReducer, INITIAL_STATE);

    useEffect(() => {
        getStopsListRequest()
            .then(stopsList => {
                dispatch({type: STEPS_ACTIONS.LOAD_STEPS, payload: {stopsList}})
            })
            .catch(er => {
                console.log("something went wrong", er)
            })
    }, []);

    const setCompletedStop = useCallback((completedStopId) => {
        dispatch({type: STEPS_ACTIONS.COMPLETE_STEP, payload: {completedStopId}})
    }, [])

    const setOpenedStepId = useCallback((openedStepId) =>
            dispatch({type: STEPS_ACTIONS.SELECT_STEP, payload: {openedStepId}}),
        [])

    return (
        <StepsContext.Provider
            value={{
                isStepsLoading: state.isStepsLoading,
                stopsList: state.stopsList,
                openedStepId: state.openedStepId,
                setOpenedStepId,
                setCompletedStop,
            }}
        >
            {children}
        </StepsContext.Provider>
    )
};
