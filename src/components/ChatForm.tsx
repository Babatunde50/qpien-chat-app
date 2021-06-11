import { Flex, Text, Stack } from "@chakra-ui/layout";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { gql, useMutation } from "@apollo/client";

const ADD_CHAT_PANEL = gql`
  mutation CREATE_CHAT_PANEL($data: NewPanelInput) {
    createNewChatPanel(data: $data) {
      _id
    }
  }
`;

type FormValues = {
  title: string;
  url: string;
};

const schema = yup.object().shape({
  title: yup.string().min(2, "başlık en az 2 karakter olmalıdır").required(),
  url: yup.string().url("web sitesi geçerli bir url olmalıdır").required(),
});

const ChatForm = () => {
  const history = useHistory();
  const [addChatPanel, {  loading }] = useMutation(ADD_CHAT_PANEL);
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await addChatPanel({ variables: { data } });
          toast({
            status: "success",
            title: "BAŞARI",
            description: "sohbet paneli oluşturuldu",
            position: "top",
          });
          history.push(
            `${history.location.pathname}/copy-code?_id=${result.data.createNewChatPanel._id}`
          );
        } catch (err) {}
      })}
    >
      <Stack spacing={4} direction="column">
        <Stack spacing={2} direction="column">
          <FormControl id="title" isRequired isInvalid={!!errors.title}>
            <FormLabel htmlFor="title"> Canli destek adi </FormLabel>
            <Input
              ref={register}
              placeholder="(Orn: Apple, Apple Chat, Apple Web)"
              type="text"
              name="title"
              id="title"
            />
            <Text> Canli destek icin bir isim verebilirsiniz </Text>
            <FormErrorMessage mt="0px">
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack spacing={2} direction="column">
          <FormControl id="url" isRequired isInvalid={!!errors.url}>
            <FormLabel htmlFor="url"> Website </FormLabel>
            <Input
              ref={register}
              type="(Orn: https:www.apple.com )"
              background="#F5F6FF"
              borderColor="#0911D2"
              id="url"
              name="url"
            />
            <Text> Canli destigi eklemek istediginiz websitesi </Text>
            <FormErrorMessage mt="0px">
              {errors.url && errors.url.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Flex py="4" align="center" justify="space-between" gap="8px">
          <Button colorScheme="red" isFullWidth mr="2" onClick={() => history.push("/")}>
            Iptal
          </Button>
          <Button
            isLoading={loading}
            loadingText="Submitting"
            colorScheme="primary"
            isFullWidth
            ml="2"
            type="submit"
          >
            Ileri
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default ChatForm;
