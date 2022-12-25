export const generateId = () => Math.floor((1 + Math.random()) * 0x10000);

export const reorderColumnList = (
  sourceCol: {
    id: string;
    title: string;
    taskIds: number[];
  },
  startIndex: number,
  endIndex: number
) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};
