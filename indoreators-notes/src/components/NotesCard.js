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
    <Box key={id} bgColor={"#a8e8fa"} borderRadius={"10px"} padding={'100px 20px'} p="20px" boxShadow="md" mb="10px">
      <Text fontWeight="bold" fontSize={'25px'}>{`${el.title.substring(0, 30)}...`}</Text>
      <Text mt={'10px'} fontSize={'20px'}>{`${el.description.substring(0, 70)}...`}</Text>
      <DeleteIcon onClick={deleteNote} cursor="pointer" mt={'20px'} color="red.500" />
    </Box>
  );
};

export default NotesCard;
