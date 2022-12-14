import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
//
const Column = dynamic(() => import("components/Column"), { ssr: false });
//
import { initialState } from "config/dnd";

const reorderColumnList = (sourceCol: any, startIndex: any, endIndex: any) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const Home = () => {
  //
  const [state, setState] = useState(initialState);
  //
  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    //
    if (!destination) return;
    //
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    //
    const sourceCol = (state.columns as any)[source.droppableId];
    const destinationCol = (state.columns as any)[destination.droppableId];
    if (destinationCol.id === sourceCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
      const newState = {
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      };
      setState(newState);
      return;
    }
    //
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        dir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="4rem" flexDir="column" align="center" w="full">
          <Heading fontSize="3xl" fontWeight={600}>
            React Beatiful Drag and Drop
          </Heading>
          <Text fontSize="20px" fontWeight={600} color="subtle-text">
            React-Beatiful-dnd
          </Text>
          <Flex justify="space-between" px="4rem" gap="24px">
            {state.columnOrder.map((column) => {
              const columnState = (state.columns as any)[column];
              const tasks = columnState.taskIds.map(
                (taskId: string) => (state.tasks as any)[taskId]
              );
              return (
                <Column
                  title={columnState.title}
                  key={columnState.id}
                  id={columnState.id}
                >
                  {tasks.map((i: any, index: number) => (
                    <Draggable key={i.id} draggableId={`${i.id}`} index={index}>
                      {({ innerRef, draggableProps, dragHandleProps }) => (
                        <Flex
                          ref={innerRef}
                          key={i.id}
                          mb="1rem"
                          h="72px"
                          bg="card-bg"
                          rounded="3px"
                          p="1.5rem"
                          {...draggableProps}
                          {...dragHandleProps}
                        >
                          <Text>{i.content}</Text>
                        </Flex>
                      )}
                    </Draggable>
                  ))}
                </Column>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </DragDropContext>
  );
};

export default Home;
