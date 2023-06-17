import { configureStore } from "@reduxjs/toolkit";
import sidebarOpen from "../feature/sidebarOpen";
import toggleUI from "../feature/toggleUI";
import activeEvent from "../feature/activeEvent";
import tableRender from "../feature/tableRender";


export default configureStore({
    reducer: {
        sidebarOpen: sidebarOpen,
        toggleUI: toggleUI,
        activeEvent: activeEvent,
        tableRender: tableRender
    }
});