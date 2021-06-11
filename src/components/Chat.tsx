import { ArrowRightIcon, ChatIcon } from "@chakra-ui/icons";
import {
  Stack,
  Flex,
  Input,
  Textarea,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React from "react";

const Chat = () => {
  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        p="4"
        minH="80vh"
        borderBottom="1px solid #ccc"
      >
        <p>Hello</p>
      </Stack>
      <Flex align="center" justify="space-between">
        <Input
          px="1"
          _focus={{ borderColor: "none", boxShadow: "none" }}
          type="text"
          border="none"
          borderRadius="none"
          flex="1"
          py="8"
        />
        <IconButton aria-label="Search database" icon={<ArrowRightIcon />} />
      </Flex>
    </>
  );
};

export default Chat;
