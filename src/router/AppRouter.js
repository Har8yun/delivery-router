import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "../constants";
import PagesWrapper from "../pages/PagesWrapper";
import RouteList from "../components/RouteList/RouteList";
import StopsMap from "../components/StopsMap/StopsMap";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={APP_ROUTES.STOPS} element={<PagesWrapper/>}>
                <Route path={APP_ROUTES.STOPS} element={<RouteList/>}/>
                <Route path={APP_ROUTES.MAP} element={<StopsMap />}/>

                <Route path="*" element={<NotFound />}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;