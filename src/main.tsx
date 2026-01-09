// Node.js polyfills must be imported FIRST (required by httpsnippet)
import "~/utils/node-polyfills";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Webapp } from "~/webapp";
import "~/styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Webapp />
  </StrictMode>,
);
