// Node.js polyfills must be imported FIRST (required by httpsnippet)
import "~/utils/node-polyfills";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/styles/global.css";
import { Webapp } from "~/webapp";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found within the DOM (double check your index.html file)");
}

createRoot(root).render(
  <StrictMode>
    <Webapp />
  </StrictMode>
);
