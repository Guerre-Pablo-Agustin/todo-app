declare module "react-beautiful-dnd" {
  import * as React from "react";

  // Tipo para representar el resultado del drag-and-drop
  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination: {
      droppableId: string;
      index: number;
    } | null; // Si se suelta fuera de un destino válido
    reason: "DROP" | "CANCEL";
  }

  export interface ResponderProvided {
    announce: (message: string) => void;
  }

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
    children?: React.ReactNode;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided) => React.ReactNode;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (provided: DroppableProvided) => React.ReactNode;
  }

  export const DragDropContext: React.FC<DragDropContextProps>;
  export const Draggable: React.FC<DraggableProps>;
  export const Droppable: React.FC<DroppableProps>;
}
