import { Box, Text } from '@chakra-ui/react'
import React from 'react';
import {HamburgerIcon} from "@chakra-ui/icons"

const Navbar = () => {
  return (
    <Box width={"100%"} display={'flex'} justifyContent={'left'} gap={'30px'} alignItems={'center'} p={'10px 30px'} color={'white'} bgColor={'black'}>
        <HamburgerIcon fontSize={'25px'}/>
        <Text fontSize={'25px'} fontWeight={'700'}>Notes</Text>
    </Box>
  )
}

export default Navbar