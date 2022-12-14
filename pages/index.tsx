import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
// Dynamic imports
const Column = dynamic(() => import("components/Column"), { ssr: false });
// Config files
import { initialState } from "config/dnd";
import { generateId, reorderColumnList } from "utils";
import { DeleteIcon } from "@chakra-ui/icons";

const Home = () => {
  // state's
  const [task, setTask] = useState("");
  const [state, setState] = useState(initialState);
  // on drag end
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

  const onSubmit = () => {
    setTask("");
    const id = generateId();
    const newTask = {
      id,
      content: task,
    };
    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [id]: newTask,
      },
      columns: {
        ...state.columns,
        "column-1": {
          ...state.columns["column-1"],
          taskIds: [...state.columns["column-1"].taskIds, id],
        },
      },
    };
    setState(newState);
  };
  const onChange = (e: any) => setTask(e.target.value);

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
          <Flex my="24px" gap="12px" color="subtle-text">
            <Input
              variant="filled"
              placeholder="Añadir una tarea"
              value={task}
              onChange={onChange}
            />
            <Button color="InfoText" onClick={onSubmit}>
              Agregar
            </Button>
          </Flex>
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
                    <Draggable
                      key={i?.id}
                      draggableId={`${i?.id}`}
                      index={index}
                    >
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
                          justify="space-between"
                          align="center"
                        >
                          <Text>{i.content}</Text>
                          <IconButton
                            colorScheme="red"
                            fontSize={20}
                            icon={<DeleteIcon />}
                            aria-label="Delete"
                            onClick={() => {
                              const newState = {
                                ...state,
                                columns: {
                                  ...state.columns,
                                  [column]: {
                                    ...(state.columns as any)[column],
                                    taskIds: [
                                      ...(state.columns as any)[
                                        column
                                      ].taskIds.filter((j: any) => j != i.id),
                                    ],
                                  },
                                },
                              };
                              delete (newState.tasks as any)[i.id];
                              console.log(
                                newState,
                                (newState.tasks as any)[i.id]
                              );
                              setState(newState);
                            }}
                          />
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
