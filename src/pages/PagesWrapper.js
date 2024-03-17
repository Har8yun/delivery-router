import {Outlet} from "react-router-dom";
import MobileNavigation from "../components/MobileNavigation/MobileNavigation";
import {Box} from "@mui/material";

const PagesWrapper = () => {
    return (
        <Box sx={{marginBottom: "3.5rem"}}>
            <Outlet />
            <MobileNavigation />
        </Box>
    );
};

export default PagesWrapper;