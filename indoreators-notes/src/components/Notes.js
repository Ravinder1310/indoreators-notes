import { useEffect, useState } from "react";
import {
  useToast,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Navbar from "./Navbar";
import NotesCard from "./NotesCard";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [data, setData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCreate = async () => {
    const dataToSubmit = {
      title,
      description,
    };

    try {
      if (title.trim() !== "" && description.trim() !== "") {
        setLoading(true);
        await axios.post(
          "https://elegant-underwear-tick.cyclic.app/api/v1/notes/create-notes",
          dataToSubmit
        );

        setLoading(false);
        setTitle("");
        setDescription("");

        toast({
          title: "Notes created Successfully.",
          description: "We've created your notes for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        getData();
        onClose();
      } else {
        toast({
          title: "Please fill in both title and description.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating note.",
        description: error.message || "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://elegant-underwear-tick.cyclic.app/api/v1/notes/get-notes"
      );
      setData(res.data.notes);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching notes.",
        description:
          error.message || "Something went wrong while fetching notes!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://elegant-underwear-tick.cyclic.app/api/v1/notes/delete-notes/${id}`
      );

      toast({
        title: "Note Deleted",
        description: "The note has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      getData(); // Refresh data after deletion
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "An error occurred while deleting the note.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Navbar />
      <Button
        onClick={onOpen}
        mt="40px"
        bgColor="blue"
        color="white"
        _hover={{ bgColor: "black", color: "white" }}
      >
        Create a Note
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={20}>
          <ModalHeader>Create Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center" mt="20px" mb="30px">
              <Input
                placeholder="Enter a title"
                w="80%"
                border="1px solid black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Enter a description"
                w="80%"
                border="1px solid black"
                mt="30px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleCreate}>
              {loading ? "Creating...." : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {data.length > 0 ? (
        <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        padding="20px 40px"
        gap="20px"
        mt="40px"
        >
          {data.map((el) => (
            <NotesCard
              el={el}
              id={el._id}
              key={el._id}
              handleDelete={handleDelete}
            />
          ))}
        </Box>
      ) : (
        <Text
          w={"50%"}
          margin={"auto"}
          fontSize={"50px"}
          fontWeight={700}
          mt={"60px"}
        >
          You Don't have any notes yet! Please create a note first......
        </Text>
      )}
    </Box>
  );
};

export default Notes;
