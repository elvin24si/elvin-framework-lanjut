import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import ShiroFrames from "./ShiroFrames";
import'./tailwind.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            <TailwindCSS/>
        </div>
    )