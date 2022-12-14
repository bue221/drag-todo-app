import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";

const Column = ({
  title,
  children,
  id,
}: {
  title: string;
  key: any;
  id: any;
  children: React.ReactFragment | React.ReactElement;
}) => {
  return (
    <Flex rounded="3px" bg="column-bg" w="400px" h="620px" flexDir="column">
      <Flex
        align="center"
        h="60px"
        bg="column-header-bg"
        rounded="3px 3px 0 0"
        px="1.5rem"
        mb="1.5rem"
      >
        <Text fontSize="17px" fontWeight={600} color="subtle-text">
          {title}
        </Text>
      </Flex>
      <Droppable droppableId={id}>
        {({ droppableProps, innerRef }) => (
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            ref={innerRef}
            {...droppableProps}
          >
            {children}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
