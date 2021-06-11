import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import ReactLogo from "./images/logo.svg";
import Welcome from "./pages/Welcome";
import AddNewChat from "./pages/AddNewChat";
import ChatPanelList from "./pages/ChatPanelList"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <nav>
        <Flex background="black" p="4">
          <Box w="100px">
            <Image src={ReactLogo} width="100%" />
          </Box>
        </Flex>
      </nav>
      <main>
        <Flex px="8" py="4" minHeight="80vh">
          <Box flexBasis="25%" background="white" px="8">
            <Text fontWeight="bold"> Kanallar </Text>
            <Box>
              <Button colorScheme="primary" isFullWidth my="2">
                Opien Chat
              </Button>
              <Button colorScheme="primary" isFullWidth my="2">
                Opien Chat
              </Button>
              <Button colorScheme="primary" isFullWidth my="2">
                Opien Chat
              </Button>
            </Box>
          </Box>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/add-new-chat">
              <AddNewChat />
            </Route>
            <Route path="/chat-panel-list">
              <ChatPanelList />
            </Route>
            <Route path="/edit/:_id">
              <Edit />
            </Route>
          </Switch>
        </Flex>
      </main>
    </Router>
  );
}

export default App;
