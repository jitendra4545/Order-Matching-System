import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Box, Button, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, FormControl, FormLabel, Input, ModalFooter } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { postBuySuccess } from '../redux/action'


export const AddOrder = ({getBuyData,updateBuyData,updateSellData}) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
const [buyQty, setbuyQty] = useState("")
const [buyPrice, setbuyPrice] = useState("")
//console.log(getBuyData)

  const handleBuy = async() => {
    const payload={
      buyQty,
      buyPrice,
      isEqual:false
    }
     axios.post(`http://localhost:4500/buy`,payload)
     .then((res)=>{
      console.log(res.data)
      dispatch(postBuySuccess(res.data))
        getBuyData()
   
     }).catch(err=>console.log(err))
  }
 

  return (
    <Box>

      <Box>
        <Button onClick={onOpen} _hover={{ bg: "blue.500" }} bg='blue' color='white' padding={'20px 50px'} fontWeight={'bold'} >BUY</Button>
      </Box>
      <>


        <Modal

          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Buy Your Order</ModalHeader>
            <ModalCloseButton color='red' />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Enter Price</FormLabel>
                <Input onChange={(e)=>setbuyPrice(e.target.value)} type='number' placeholder='Enter Price' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Enter Quantity</FormLabel>
                <Input onChange={(e)=>setbuyQty(e.target.value)} type='number' placeholder='Enter Quantity' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleBuy} colorScheme='blue' mr={3}>
                Place Order
              </Button>
              {/* <Button onClick={onClose}>Cancel</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>




    </Box>
  )
}
