import { createRoot } from "react-dom/client";
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter"
import ResponsiveDesign from "./ResponsiveDesign"
import Whiteframe from "./Whiteframe";
import'./tailwind.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList/> */}
            {/* <FrameworkListSearchFilter/>
            <ResponsiveDesign/> */}
            <Whiteframe/>
        </div>
    )