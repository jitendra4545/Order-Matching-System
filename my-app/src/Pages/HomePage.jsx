import { Box } from '@chakra-ui/react'
import React from 'react'
import { Navbar } from '../components/Navbar'
import { PendingOrder } from '../components/PendingOrder'


export const HomePage = () => {
  return (
    <Box>
        <Navbar/>
        
        <PendingOrder/>
        
    </Box>
  )
}
