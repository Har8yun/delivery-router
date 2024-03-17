export const INITIAL_STATE = {
    isStepsLoading: true,
    stopsList: [],
    openedStepId: 0,
};

export const STEPS_ACTIONS = {
    LOAD_STEPS: "LOAD_STEPS",
    COMPLETE_STEP: "COMPLETE_STEP",
    SELECT_STEP: "SELECT_STEP",
};

export const stepsReducer = (state, {type, payload}) => {
    switch (type) {
        case STEPS_ACTIONS.LOAD_STEPS:
            return {...state, isStepsLoading: false, stopsList: payload.stopsList};
        case STEPS_ACTIONS.SELECT_STEP:
            return {...state, openedStepId: payload.openedStepId};
        case STEPS_ACTIONS.COMPLETE_STEP:
            const allItems = structuredClone(state.stopsList);
            const stopsList = allItems.map(stop => {
                if (stop.sequence_number === payload.completedStopId) {
                    stop.completed = true;
                    return stop;
                }

                return stop
            });

            return {...state, stopsList, openedStepId: 0};
        default:
            throw Error(`Unknown action: ${type}`);
    }
}
