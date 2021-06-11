import { ArrowRightIcon, ChatIcon } from "@chakra-ui/icons";
import { Stack, Flex, Input, Text, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ChatInterface {
  createdChat: any;
  saveChat: any;
}

type ChatType = {
  text: string;
  _id: string;
  type: "reply" | "sent";
};

const Chat: React.FC<ChatInterface> = ({ createdChat, saveChat }) => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const { register, handleSubmit, reset } = useForm<{ text: string }>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (createdChat) {
      setChats((chats) => [
        ...chats,
        {
          ...createdChat,
          type: Math.random() > 0.5 ? "sent" : "reply",
        },
      ]);
    }
  }, [createdChat]);

  console.log(chats, "___chats___");

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        p="4"
        minH="80vh"
        borderBottom="1px solid #ccc"
      >
        {chats.map((chat) => {
          console.log(chat.type);
          return (
            <Flex
              py="4"
              px="2"
              key={chat._id}
              ml={chat.type === "sent" ? "auto" : ""}
              background={chat.type === "sent" ? "#0084e6" : "#F5F5F5"}
              borderRadius="4px"
              w="50%"
              color={chat.type === "sent" ? "white" : "black"}
            >
              <Text> {chat.text} </Text>
            </Flex>
          );
        })}
      </Stack>
      <form
        onSubmit={handleSubmit(async (data) => {
          await saveChat({
            variables: { data: { text: data.text } },
          });
          reset();
        })}
      >
        <Flex align="center" justify="space-between">
          <Input
            px="1"
            _focus={{ borderColor: "none", boxShadow: "none" }}
            type="text"
            border="none"
            borderRadius="none"
            flex="1"
            py="8"
            name="text"
            ref={register}
          />
          <IconButton
            type="submit"
            aria-label="Search database"
            icon={<ArrowRightIcon />}
          />
        </Flex>
      </form>
    </>
  );
};

export default Chat;
