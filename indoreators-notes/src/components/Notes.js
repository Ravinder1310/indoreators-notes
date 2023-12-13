import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from './Navbar'

const Notes = () => {

    const [data,setData] = useState({});
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box bgColor={'#ffe6d5'}>
        <Navbar/>
        <Button onClick={onOpen} mt={'40px'} bgColor={'blue'} color={'white'} _hover={{bgColor:"black",color:"white"}}>Create a Note</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top={20}>
          <ModalHeader>Create Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <Box textAlign={"center"} mt={'20px'} mb={'30px'}>
             <Input placeholder='Enter a title' w={'80%'} border={"1px solid black"}/>
             <Input placeholder='Enter a description' w={'80%'} border={"1px solid black"} mt={'30px'}/>
          </Box>
             
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Notes