export const initialState = {
  tasks: {
    1: {
      id: 1,
      content: "Hey there",
    },
    2: {
      id: 2,
      content: "Hey there",
    },
    3: {
      id: 3,
      content: "Hey there",
    },
    4: {
      id: 4,
      content: "Hey there",
    },
    5: {
      id: 5,
      content: "Hey there",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
  // Facilita reordenar las columnas
  columnOrder: ["column-1", "column-2", "column-3"],
};
