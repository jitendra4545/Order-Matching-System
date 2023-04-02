import { Box, Button, Heading, Table, Tbody, Thead, Th, Tr, Td,TableContainer } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { AddOrder } from './BuyOrder'
import { SellOrder } from './SellOrder'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getBuySuccess, getSellSuccess } from '../redux/action'
import { store } from '../redux/store'
import { postBuySuccess } from '../redux/action'
import { CompleteOrder } from './CompleteOrder'
export const PendingOrder = () => {

    const dispatch = useDispatch()
const {buy,sell}=useSelector((store)=>store)
    

    const getBuyData = () => {
        axios.get(`http://localhost:4500/buydata`)
            .then((res) => {
                console.log(res.data)
                dispatch(getBuySuccess(res.data))
            }).catch(err => console.log(err))
    }

    const getSellData = () => {
        axios.get(`http://localhost:4500/selldata`)
            .then((res) => {
                console.log(res.data)
                dispatch(getSellSuccess(res.data))
            }).catch(err => console.log(err))
    }


   


    useEffect(() => {
        getBuyData()
        getSellData()
    }, [])





    console.log('update Store',buy,sell)

    return (
        <Box>
            <Box  w={'50%'} margin={'auto'} display={'flex'} justifyContent="space-evenly">
                <AddOrder  getBuyData={getBuyData} />
                <SellOrder getSellData={getSellData} />

            </Box>



           {/* <Heading textAlign={'center'} mt='70px'>Pending Order Table</Heading> */}
           <Box justifyContent={'space-between'} padding={'20px 180px'} display={'flex'}>
            <Box mt='30px' justifyContent={'center'} gap={20} display={'flex'}>
            <TableContainer >
            <Table  bg='skyblue' color={'orange'} >
                <Thead >
                    <Tr  >
                        <Th border={"3px solid teal"}>
                              Buy Price
                        </Th>
                        <Th border={"3px solid teal"}>
                             Buy Quantity
                        </Th>
                    </Tr>

                </Thead>
                <Tbody>
{
    buy?.map((el)=>(
        <Tr >
        <Td  border={"3px solid teal"}>
            {el.buyPrice}
        </Td>
        <Td  border={"3px solid teal"}>
            {el.buyQty}
        </Td>
    </Tr>
    ))
}
                  
                </Tbody>
            </Table>
            </TableContainer>
            
            
            <TableContainer>
            <Table bg='skyblue' color={'orange'} >
                <Thead >
                    <Tr  >
                        <Th border={"3px solid teal"}>
                              Sell Price
                        </Th>
                        <Th border={"3px solid teal"}>
                             Sell Quantity
                        </Th>
                    </Tr>

                </Thead>
                <Tbody>
{
    sell?.map((el)=>(
        <Tr >
        <Td  border={"3px solid teal"}>
            {el.sellPrice}
        </Td>
        <Td  border={"3px solid teal"}>
            {el.sellQty}
        </Td>
    </Tr>
    ))
}
                  
                </Tbody>
            </Table>
            </TableContainer>
            </Box>
            <Box>
               hi this is for complete order
               <CompleteOrder/>
            </Box>
            </Box>
        </Box>
    )
}
