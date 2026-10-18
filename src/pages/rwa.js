import "../styles/index.css";
import { mountShell } from "../shell.js";
import { mountRwaPage } from "../sections/rwa-page.js";

mountShell({ activePage: "rwa" });

const root = document.querySelector("#page-content");

mountRwaPage(root);
