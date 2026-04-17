import { createRoot } from "react-dom/client";
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter"
import'./tailwind.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList/> */}
            <FrameworkListSearchFilter/>
        </div>
    )