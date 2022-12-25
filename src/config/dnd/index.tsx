export const initialState = {
  tasks: {
    1: {
      id: 1,
      content: "Hola mundo",
    },
    2: {
      id: 2,
      content: "Hola mundo",
    },
    3: {
      id: 3,
      content: "Hola mundo",
    },
    4: {
      id: 4,
      content: "Hola mundo",
    },
    5: {
      id: 5,
      content: "Hola mundo",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "POR-HACER",
      taskIds: [1, 2, 3, 4, 5],
    },
    "column-2": {
      id: "column-2",
      title: "EN-PROGRESO",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETADO",
      taskIds: [],
    },
  },
  // Facilita reordenar las columnas
  columnOrder: ["column-1", "column-2", "column-3"],
};

type TColumn = "column-1" | "column-2" | "column-3";
type TTitle = "POR-HACER" | "EN-PROGRESO" | "COMPLETADO";

export interface IDndState {
  tasks: {
    [key: string]: { id: number; content: string };
  };
  columns: {
    [key: string]: { id: TColumn; title: TTitle; taskIds: number[] };
  };

  columnOrder: [TColumn, TColumn, TColumn];
}
