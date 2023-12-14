import { Box, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import axios from 'axios';

const NotesCard = ({ el, id, handleDelete }) => {
  const deleteNote = async () => {
    try {
      await axios.delete(`https://elegant-underwear-tick.cyclic.app/api/v1/notes/delete-notes/${id}`);
      handleDelete(id); 
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Box
    bgColor="#a8e8fa"
    borderRadius="10px"
    padding="20px" // Adjusted padding for the card
    boxShadow="md"
    mb="10px"
  >
    <Text fontWeight="bold" fontSize="20px" mb="10px">{`${el.title.substring(0, 20)}...`}</Text> {/* Adjusted font size and length */}
    <Text fontSize="16px">{`${el.description.substring(0, 50)}...`}</Text> {/* Adjusted font size and length */}
    <DeleteIcon onClick={deleteNote} cursor="pointer" mt="20px" color="red.500" />
  </Box>
  );
};

export default NotesCard;
