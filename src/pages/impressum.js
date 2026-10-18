import "../styles/index.css";
import { mountShell } from "../shell.js";
import { mountImpressum } from "../sections/impressum-content.js";

mountShell({ activePage: "impressum" });

const root = document.querySelector("#page-content");

mountImpressum(root);
