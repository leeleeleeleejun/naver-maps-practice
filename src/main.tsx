import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NavermapsProvider } from "react-naver-maps";

const naverMapApi = import.meta.env.VITE_NAVER_MAP_API;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavermapsProvider ncpClientId={naverMapApi}>
      <App />
    </NavermapsProvider>
  </React.StrictMode>
);
