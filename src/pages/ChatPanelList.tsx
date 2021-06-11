import { Box, Flex, Text, Stack } from "@chakra-ui/layout";
import {
  Button,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  Th,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, ChatIcon, CopyIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { copyCodeHandler } from "../utils/copy";

const GET_ALL_CHAT_PANELS = gql`
  query GET_ALL_CHAT_PANELS {
    chatPanels: getAllChatPanels {
      title
      url
      _id
      bio
    }
  }
`;

const ChatPanelList = () => {
  const history = useHistory();
  const toast = useToast();

  const { error, loading, data } = useQuery(GET_ALL_CHAT_PANELS);

  console.log(error, loading, data);

  return (
    <Box
      flex="1"
      background="white"
      boxShadow="4px 2px 16px -1px rgba(0,0,0,0.35)"
      borderRadius="4px"
      overflow="hidden"
    >
      <Flex
        background="#F7F7F7"
        px="2"
        py="4"
        align="center"
        justify="space-between"
      >
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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Canli Destek Adi</Th>
            <Th>Website</Th>
            <Th>Canli Destek Kodu</Th>
            <Th textAlign="center" mr="8">
              Islem
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {!loading &&
            !error &&
            data.chatPanels.map((panel: any) => {
              const code = `code.qpien.com.${panel._id}.${uuidv4()}`;
              return (
                <Tr key={panel._id}>
                  <Td> {panel.title} </Td>
                  <Td> {panel.url.slice(0, 20) + "..."} </Td>
                  <Td> {code.slice(0, 20) + "..."}</Td>
                  <Td>
                    <Button
                      onClick={() => copyCodeHandler(panel.url, toast)}
                      colorScheme="white"
                      variant="outline"
                      leftIcon={<CopyIcon />}
                      size="sm"
                      mr="2"
                    >
                      {" "}
                      Kopyala{" "}
                    </Button>
                    <Button colorScheme="red" size="sm" mr="2">
                      {" "}
                      Keldir{" "}
                    </Button>
                    <Button
                      colorScheme="primary"
                      size="sm"
                      onClick={() =>
                        history.push(
                          `/edit/${panel._id}?title=${panel.title}&bio=${
                            panel.bio || ""
                          }`
                        )
                      }
                    >
                      Duzenle
                    </Button>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      {loading && (
        <Stack direction="row" align="center" justify="center" h="20vh">
          {" "}
          <Spinner size="md" />{" "}
        </Stack>
      )}
    </Box>
  );
};

export default ChatPanelList;
