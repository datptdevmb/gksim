// // ZaUI stylesheet
// import "zmp-ui/zaui.css";
// // Tailwind stylesheet
// import "@/css/tailwind.scss";
// // Your stylesheet
// import "@/css/app.scss";

// // React core
// import React from "react";
// import { createRoot } from "react-dom/client";

// // Mount the app
// import Layout from "@/components/layout";

// // Expose app configuration
// import appConfig from "../app-config.json";

// if (!window.APP_CONFIG) {
//   window.APP_CONFIG = appConfig as any;
// }

// const root = createRoot(document.getElementById("app")!);
// root.render(React.createElement(Layout));

import "zmp-ui/zaui.css";
import "@/css/tailwind.scss";
import "@/css/app.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import { ZMPRouter } from "zmp-ui";
import AppRoutes from "@/router/index";
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <ZMPRouter>
      <AppRoutes />
    </ZMPRouter>
  </React.StrictMode>
);
