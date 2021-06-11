import { Box, Flex, Text, List, ListItem, ListIcon } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { AddIcon, ChatIcon, MinusIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const history = useHistory();
  return (
    <Box
      flex="1"
      background="white"
      boxShadow="4px 2px 16px -1px rgba(0,0,0,0.35)"
      borderRadius="4px"
      overflow="hidden"
    >
      <Flex background="#F7F7F7" p="2" py="4" align="center" justify="space-between">
        <Text fontWeight="bold">
          <ChatIcon mr="2" />
          Opien Chat
        </Text>
        <Button leftIcon={<AddIcon />} colorScheme="primary" size="xs" onClick={() => history.push("/add-new-chat") }>
          Opien Chat
        </Button>
      </Flex>
      <Flex direction="column" align="center" justify="center" h="90%">
        <ChatIcon boxSize="8rem" />
        <Text fontWeight="bold" my="8">
          Musterilerinze cok hizli bir destek ekibinizin oldugunu gosterin
        </Text>
        <List spacing={1}>
          <ListItem>
            <ListIcon as={MinusIcon} color="black.500" />
            Olasi musteri sorularinda arinda cevap verin
          </ListItem>
          <ListItem>
            <ListIcon as={MinusIcon} color="black.500" />
              Potansitel musterilerinizi ve siparislerini kacirmayin
          </ListItem>
        </List>
      </Flex>
    </Box>
  );
};

export default Welcome;
