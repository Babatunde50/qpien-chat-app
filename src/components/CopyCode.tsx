import { Flex, Text, Stack, Box } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { CopyIcon } from "@chakra-ui/icons";
import qs from "qs";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { copyCodeHandler } from "../utils/copy";

const ChatForm = () => {
  const history = useHistory();
  const toast = useToast();
  const queries = qs.parse(history.location.search, {
    ignoreQueryPrefix: true,
  });

  const code = `code.qpien.com.${queries._id || "8994349"}.${uuidv4()}`;

  return (
    <Stack spacing={4} direction="column">
      <Stack spacing={2} direction="column">
        <Text fontWeight="bold">Canli destek adi</Text>
        <Box borderRadius="4px" p="2" border="1px solid #ccc">
          <Text>{code}</Text>
          <Flex justify="flex-end" mt="4">
            <Button
              onClick={() => copyCodeHandler(code, toast)}
              rightIcon={<CopyIcon />}
            >
              {" "}
              Kopyala{" "}
            </Button>
          </Flex>
        </Box>
        <Text>
          Canli destek kodunu websitesinizin head ve body alanina ekleyin. Kodu
          wesitenize ekledikten sonra BITIR diyip islemi sonlandirabilirsiniz
        </Text>
      </Stack>
      <Flex py="4" align="center" justify="space-between" gap="8px">
        <Button
          colorScheme="red"
          isFullWidth
          mr="2"
          onClick={() => history.goBack()}
        >
          Geri
        </Button>
        <Button
          colorScheme="primary"
          isFullWidth
          ml="2"
          onClick={() => history.push("/chat-panel-list")}
        >
          Bitir
        </Button>
      </Flex>
    </Stack>
  );
};

export default ChatForm;
