import "../styles/index.css";
import { mountShell } from "../shell.js";
import { mountDatenschutz } from "../sections/datenschutz-content.js";

mountShell({ activePage: "datenschutz" });

const root = document.querySelector("#page-content");

mountDatenschutz(root);
