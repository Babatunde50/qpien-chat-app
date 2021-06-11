import { Box, Flex, Text, Stack } from "@chakra-ui/layout";
import { Button, IconButton, Radio } from "@chakra-ui/react";
import { ArrowLeftIcon, ChatIcon, AddIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import ChatForm from "../components/ChatForm";
import CopyCode from "../components/CopyCode";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const AddNewChat = () => {
  const history = useHistory();
  let { path } = useRouteMatch();
  const isNewChatPage = history.location.pathname === "/add-new-chat";

  return (
    <Box
      flex="1"
      background="#F7F7F7"
      boxShadow="4px 2px 16px -1px rgba(0,0,0,0.35)"
      borderRadius="4px"
      overflow="hidden"
    >
      <Flex background="white" px="2" py="4" align="center" justify="space-between">
        <Text fontWeight="bold">
          <ChatIcon mr="2" />
          Opien Chat
        </Text>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="primary"
          size="xs"
          onClick={() => history.push("/add-new-chat")}
        >
          Opien Chat
        </Button>
      </Flex>
      <Flex
        direction="column"
        align="center"
        justify="flex-start"
        py="8"
        h="90%"
      >
        <Box
          w="50%"
          maxW="550px"
          borderRadius="4px"
          background="white"
          boxShadow="0px -1px 6px -2px rgba(0,0,0,0.75)"
        >
          <Box px="2" py="4">
            {isNewChatPage ? (
              <Text fontWeight="bold" textAlign="center" color="#0084e6">
                Websitenize Canli destek ekleyin
              </Text>
            ) : (
              <Flex align="center">
                <IconButton
                  aria-label="back"
                  icon={<ArrowLeftIcon />}
                  size="sm"
                  onClick={() => history.goBack()}
                />
                <Text
                  fontWeight="bold"
                  textAlign="center"
                  color="#0084e6"
                  ml="8"
                >
                  Canli destek kodunu website ekleyin
                </Text>
              </Flex>
            )}
          </Box>
          <Stack
            spacing={10}
            direction="row"
            px="2"
            py="4"
            background="#F7F7F7"
            align="center"
            justify="center"
          >
            <Flex
              align="center"
              color="#0084e6"
              fontWeight="bold"
            >
              <Text mr="2"> 1 </Text>
              <Radio defaultIsChecked>Website detaylan</Radio>
            </Flex>
            <Flex
              align="center"
              color={!isNewChatPage ? "#0084e6" : ""}
              fontWeight={!isNewChatPage ? "bold" : ""}
            >
              <Text mr="2"> 2 </Text>
              <Radio defaultChecked={!isNewChatPage}>Canli destek Kod</Radio>
            </Flex>
          </Stack>
          <Box p="4">
            <Switch>
              <Route exact path={path}>
                <ChatForm />
              </Route>
              <Route path={`${path}/copy-code`}>
                <CopyCode />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddNewChat;
