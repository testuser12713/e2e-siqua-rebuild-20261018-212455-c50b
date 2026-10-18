import "../styles/index.css";
import { mountShell } from "../shell.js";
import { mountIbakPage } from "../sections/ibak-page.js";

mountShell({ activePage: "ibak" });

const root = document.querySelector("#page-content");

mountIbakPage(root);
