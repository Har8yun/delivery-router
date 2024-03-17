import stops_list from "../../stops_list.json";

export const getStopsListRequest = () => {
    //request imitation for loading
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(stops_list)
        }, 500)
    })
};

export const setStopCompletedRequest = (id) => {
    //request imitation for loading
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 500)
    })
};