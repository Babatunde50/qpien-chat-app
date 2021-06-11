import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, Button, Input, IconButton } from "@chakra-ui/react";
import { AddIcon, ChatIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import qs from "qs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import EditPanel from "../components/EditPanel";
import Chat from "../components/Chat";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { gql, useMutation, useSubscription } from "@apollo/client";
import React, { useState } from "react";

const SAVE_NEW_CHAT = gql`
  mutation SAVE_NEW_CHAT($data: NewChatInput!) {
    saveNewChat(data: $data) {
      text
      createdAt
    }
  }
`;

const NEW_CHAT_SUBSCRIPTION = gql`
  subscription onNewChat {
    onNewChat {
      text
      _id
      createdAt
    }
  }
`;

type FormValues = {
  title: string;
  bio: string;
};

const schema = yup.object().shape({
  title: yup.string().required(),
});

const Edit = () => {
  const history = useHistory();
  const params = useParams() as any;
  let { path, url } = useRouteMatch();
  const queries = qs.parse(history.location.search, {
    ignoreQueryPrefix: true,
  });
  const [logoURL, setLogoURL] = useState("");
  const [saveChat, { loading }] = useMutation(SAVE_NEW_CHAT);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      title: queries.title as string,
      bio: (queries.bio as string) || "",
    },
    resolver: yupResolver(schema),
  });
  const { register: registerChatInput, handleSubmit: handleChatInputSubmit } =
    useForm<{ text: String }>({ mode: "onBlur" });

  const { data: subData, loading: subLoading } = useSubscription(SAVE_NEW_CHAT);
  const isEditPage = history.location.pathname.trim() === `/edit/${params._id}`;

  return (
    <Flex flex="1">
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
            Opien Chat Duzenle
          </Text>
          <Text fontWeight="bold"> {watch("title")} </Text>
        </Flex>
        <Flex align="center" justify="space-between" p="2">
          <Button
            colorScheme={isEditPage ? "primary" : "gray"}
            size="sm"
            px="12"
            onClick={() =>
              history.push(`${url}?title=${watch("title")}&bio=${watch("bio")}`)
            }
          >
            Gorunum
          </Button>
          <Button
            colorScheme={!isEditPage ? "primary" : "gray"}
            size="sm"
            px="12"
            onClick={() => history.push(`${url}/chat`)}
          >
            Test Chat
          </Button>
        </Flex>
        <Switch>
          <Route exact path={path}>
            <EditPanel
              handleSubmit={handleSubmit}
              register={register}
              logoURL={logoURL}
              setLogoURL={setLogoURL}
            />
          </Route>
          <Route path={`${path}/chat`}>
            <Chat />
          </Route>
        </Switch>
      </Box>
      <Box flexBasis="40%" ml="4">
        <Flex background="#F7F7F7" p="2" align="center" justify="space-between">
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
        <Flex direction="column" align="center" justify="center" h="90%">
          <Box
            borderRadius="4px"
            w="65%"
            overflow="hidden"
            boxShadow="2px 4px 17px -4px rgba(0,0,0,0.75)"
          >
            <Box background="#0084e6" p="4" color="white">
              <Flex align="center">
                <Avatar name="tundejs" mr="4" src={logoURL ? logoURL : "https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg"} />
                <Text fontWeight="bold"> {watch("title")} </Text>
              </Flex>
              <Text fontWeight="light">{watch("bio")}</Text>
            </Box>
            <Box minH="50vh" borderBottom="1px solid #ccc" p="4"></Box>
            <form
              onSubmit={handleChatInputSubmit(async (data) => {
                const response = await saveChat({
                  variables: { data: { text: data.text } },
                });
                console.log(response);
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
                  name="text"
                  ref={registerChatInput}
                />
                <IconButton
                  aria-label="Search database"
                  icon={<ArrowRightIcon />}
                  type="submit"
                />
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Edit;
