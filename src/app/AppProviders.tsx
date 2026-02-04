
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { HashRouter as Router } from "react-router-dom";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
}

export default AppProviders;
