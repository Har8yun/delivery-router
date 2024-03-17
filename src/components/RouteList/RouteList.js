import List from "@mui/material/List";
import RouteItem from "./RouteItem";
import {useContext} from "react";
import {StepsContext} from "../../context/StepsContextProvider";
import {LinearProgress} from "@mui/material";

const RouteList = () => {
    const {stopsList, isStepsLoading} = useContext(StepsContext);

    return (
        isStepsLoading
            ?
            <LinearProgress/>
            :
            <List sx={{backgroundColor: "background.paper"}}>
                {stopsList.map((stop) => {
                    return (
                        <RouteItem key={stop.sequence_number} {...stop} />
                    );
                })
                }
            </List>
    );
};

export default RouteList;
