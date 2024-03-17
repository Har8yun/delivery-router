import {BrowserRouter} from "react-router-dom";
import {StepsContextProvider} from "./context/StepsContextProvider";
import AppRouter from "./router/AppRouter";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
      <BrowserRouter>
          <StepsContextProvider>
              <AppRouter />
          </StepsContextProvider>
      </BrowserRouter>
  );
}

export default App;
