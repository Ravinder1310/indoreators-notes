import { Box, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import axios from 'axios';

const NotesCard = ({ el, id, handleDelete }) => {
  const deleteNote = async () => {
    try {
      await axios.delete(`https://elegant-underwear-tick.cyclic.app/api/v1/notes/delete-notes/${id}`);
      handleDelete(id); // Trigger the handleDelete function from the parent component after successful deletion
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box key={id} bg="white" p="20px" boxShadow="md" mb="10px">
      <Text fontWeight="bold">{el.title}</Text>
      <Text>{el.description}</Text>
      <DeleteIcon onClick={deleteNote} cursor="pointer" color="red.500" />
    </Box>
  );
};

export default NotesCard;
