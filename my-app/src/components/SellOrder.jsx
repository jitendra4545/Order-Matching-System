import React,{useState} from 'react'
import { Box,Button, Heading ,Modal,ModalBody,ModalContent,ModalHeader,ModalOverlay,ModalCloseButton,FormControl,FormLabel,Input,ModalFooter} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { postSellSuccess } from '../redux/action'
import axios from 'axios'
import { useDispatch } from 'react-redux'
export const SellOrder = ({getSellData}) => {
    const [sellQty, setsellQty] = useState("")
    const [sellPrice, setsellPrice] = useState("")
    const dispatch=useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleAdd=async()=>{
        const payload={
            sellQty,
            sellPrice,
            isEqual:false
          }
           axios.post(`http://localhost:4500/sell`,payload)
           .then((res)=>{
            console.log(res.data)
            dispatch(postSellSuccess(res.data))
getSellData()
           }).catch(err=>console.log(err))
    }


  return (
    <Box>
    
    <Box>
      <Button onClick={onOpen} _hover={{bg:"red.500"}} bg='red' color='white' padding={'20px 50px'} fontWeight={'bold'} >SELL</Button>
      </Box>
        <>
     
     
      <Modal
       
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell Your Order</ModalHeader>
          <ModalCloseButton color='red' />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter Price</FormLabel>
              <Input onChange={(e)=>setsellPrice(e.target.value)} type='number' placeholder='Enter Price' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Quantity</FormLabel>
              <Input onChange={(e)=>setsellQty(e.target.value)} type='number' placeholder='Enter Quantity' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleAdd} colorScheme='blue' mr={3}>
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
