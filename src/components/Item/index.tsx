import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Item = ({
  text,
  ref,
  ...props
}: {
  text: string;
  ref?: React.LegacyRef<HTMLDivElement> | undefined;
}) => {
  return (
    <Flex
      mb="1rem"
      ref={ref}
      h="72px"
      bg="card-bg"
      rounded="3px"
      p="1.5rem"
      {...props}
    >
      <Text>{text}</Text>
    </Flex>
  );
};

export default Item;
