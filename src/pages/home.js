import "../styles/index.css";
import { mountShell } from "../shell.js";
import { mountHomeAreas } from "../sections/home-areas.js";
import { mountHomeContacts } from "../sections/home-contacts.js";

mountShell({ activePage: "home" });

const root = document.querySelector("#page-content");

mountHomeAreas(root);
mountHomeContacts(root);
