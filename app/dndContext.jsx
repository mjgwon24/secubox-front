"use client";

import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {createDragDropManager} from "dnd-core";

const manager = createDragDropManager(HTML5Backend);

export function DndContext({children}) {
    return <DndProvider manager={manager} backend={HTML5Backend}>{children}</DndProvider>
}