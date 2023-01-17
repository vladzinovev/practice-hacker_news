import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import StoreComponent from "./store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreComponent>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </StoreComponent>
);
