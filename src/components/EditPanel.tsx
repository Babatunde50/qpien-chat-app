import { Flex, Text, Stack } from "@chakra-ui/layout";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";

const EDIT_CHAT_PANEL = gql`
  mutation EDIT_CHAT_PANEL(
    $_id: ID!
    $title: String
    $bio: String
  ) {
    editChatPanel(_id: $_id, title: $title, bio: $bio) {
      title
      _id
      bio
    }
  }
`;

type FormValues = {
  title: string;
  bio: string;
};

interface EditPanelInterface {
  register: any;
  handleSubmit: any;
  logoURL: string;
  setLogoURL: (val: string) => void;
}

interface CameraProps {}

const Camera: React.FC<CameraProps> = ({}) => {
  return (
    <svg
      width="24"
      height="26"
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 3.25L7.17 5.41667H4C2.9 5.41667 2 6.39167 2 7.58333V20.5833C2 21.775 2.9 22.75 4 22.75H20C21.1 22.75 22 21.775 22 20.5833V7.58333C22 6.39167 21.1 5.41667 20 5.41667H16.83L15 3.25H9ZM12 19.5C9.24 19.5 7 17.0733 7 14.0833C7 11.0933 9.24 8.66667 12 8.66667C14.76 8.66667 17 11.0933 17 14.0833C17 17.0733 14.76 19.5 12 19.5Z"
        fill="#9E9E9C"
      />
      <path
        d="M12 18.4167L13.25 15.4375L16 14.0833L13.25 12.7292L12 9.75L10.75 12.7292L8 14.0833L10.75 15.4375L12 18.4167Z"
        fill="#9E9E9C"
      />
    </svg>
  );
};

const EditPanel: React.FC<EditPanelInterface> = ({
  register,
  handleSubmit,
  logoURL,
  setLogoURL,
}) => {
  const history = useHistory();
  const params = useParams() as any;
  const fileInputRef = useRef(null);
  const [editChatPanel, { loading }] = useMutation(EDIT_CHAT_PANEL);

  function uploadImageHandler(callback: (val: string) => void) {
    //@ts-ignore
    fileInputRef.current.click();
    //@ts-ignore
    fileInputRef.current.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    };
  }

  return (
    <form
      onSubmit={handleSubmit(async (data: FormValues) => {
        console.log(data);
        try {
          const result = await editChatPanel({
            variables: {
              title: data.title,
              bio: data.bio,
              _id: params._id,
            },
          });
          console.log(result);
        } catch (err) {}
      })}
    >
      {" "}
      <Stack
        direction="column"
        spacing={3}
        px="8"
        py="12"
        minH="80vh"
        borderBottom="1px solid #ccc"
      >
        <Flex align="center">
          <Text minW="max-content" flexBasis="50%" fontWeight="bold">
            Logo
          </Text>
          <>
            <input ref={fileInputRef} hidden type="file" accept="image/*" />
            <Flex
              align="center"
              justify="center"
              width="50px"
              height="50px"
              background="#fff"
              border="1px solid #ccc"
              borderRadius="50%"
              overflow="hidden"
              onClick={(e) => {
                e.stopPropagation();
                uploadImageHandler((val) => setLogoURL(val));
              }}
              cursor="pointer"
            >
              {logoURL ? (
                <img
                  src={logoURL}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="community avatar"
                />
              ) : (
                !logoURL && <Camera />
              )}
            </Flex>
          </>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text minW="max-content" fontWeight="bold">
            Marka Adi
          </Text>
          <Input ref={register} name="title" type="text" flexBasis="50%" />
        </Flex>
        <Flex align="center" justify="space-between">
          <Text minW="max-content" fontWeight="bold">
            Chat Bilgi Alani
          </Text>
          <Textarea ref={register} name="bio" flexBasis="50%" />
        </Flex>
      </Stack>
      <Flex align="center" justify="space-between" p="4">
        <Button colorScheme="red" onClick={() => history.goBack()}>
          {" "}
          Vazgec{" "}
        </Button>
        <Button
          colorScheme="primary"
          type="submit"
          isLoading={loading}
          loadingText="Submitting"
        >
          {" "}
          Kaydet{" "}
        </Button>
      </Flex>
    </form>
  );
};

export default EditPanel;
