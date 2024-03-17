import {useCallback, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {MESSAGES} from "../messages";
import {useLocation, useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../constants";

const MobileNavigation = () => {
    const {pathname} = useLocation();
    const [value, setValue] = useState(pathname);
    const navigate = useNavigate();
    const goStops = useCallback(() => navigate(APP_ROUTES.STOPS), [navigate]);
    const goMap = useCallback(() => navigate(APP_ROUTES.MAP), [navigate]);

    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
            >
                <BottomNavigationAction value={APP_ROUTES.STOPS} onClick={goStops} label={MESSAGES.ROUTE} icon={<LocalShippingIcon/>}/>
                <BottomNavigationAction value={APP_ROUTES.MAP} onClick={goMap} label={MESSAGES.MAP} icon={<MapIcon/>}/>
            </BottomNavigation>
        </Paper>
    );
};

export default MobileNavigation;