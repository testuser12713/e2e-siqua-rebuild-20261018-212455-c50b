import "../styles/index.css";
import { mountShell } from "../shell.js";
import { mountKontaktDirectory } from "../sections/kontakt-directory.js";
import { mountKontaktMap } from "../sections/kontakt-map.js";

mountShell({ activePage: "kontakt" });

const root = document.querySelector("#page-content");

mountKontaktDirectory(root);
mountKontaktMap(root);
