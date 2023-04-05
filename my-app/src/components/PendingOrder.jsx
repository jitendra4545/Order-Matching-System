import { Box, Button, Heading, Table, Tbody, Thead, Th, Tr, Td, TableContainer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AddOrder } from './BuyOrder'
import { SellOrder } from './SellOrder'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getBuySuccess, getSellSuccess, updateBuySuccess, updateSellSuccess } from '../redux/action'
import { store } from '../redux/store'
import { postBuySuccess } from '../redux/action'

export const PendingOrder = () => {
    const [comp, setcomp] = useState([])
    const dispatch = useDispatch()
    const { buy, sell, complete } = useSelector((store) => store)



    const fetchData = async () => {
        try {
            let data1 = await axios.get(`https://fair-erin-viper-kilt.cyclic.app/buydata`)
            let data2 = await axios.get(`https://fair-erin-viper-kilt.cyclic.app/selldata`)

            const buyData = data1.data
            const sellData = data2.data
            dispatch(getBuySuccess(buyData))

            dispatch(getSellSuccess(sellData))
        } catch (err) {
            console.log(err)
        }

    }



    useEffect(() => {
        fetchData()

    }, [])




    console.log('update Store', buy, sell, complete)
    buy?.sort((a, b) => b.buyPrice - a.buyPrice)

    sell?.sort((a, b) => a.sellPrice - b.sellPrice)

    const updateData = async () => {
        let id = ""
        let updateBuy = sell.filter((el) => {
            let match = buy.find((el2) => el2.buyPrice === el.sellPrice && el2.isEqual === false)
            setcomp([...comp, match])
            if (match) {
                
                id = el._id
                console.log("match", match)
                let qty = el.sellQty - match.buyQty
                console.log(el.sellQty, qty, buy)
                return {...el.sellQty=qty }
            } else {
                return el
            }


        })
        console.log(id,updateBuy)

        let newUpdate = updateBuy.filter((el) => el._id == id)
        console.log(newUpdate)
        axios.patch(`https://fair-erin-viper-kilt.cyclic.app/updatesell/${id}`, newUpdate[0])
            .then((res) => {
                console.log(res.data)
                dispatch(updateSellSuccess(res.data))

            }).catch((err) => console.log(err))


    }


    const updateSeData = async () => {
        let id = ""
        let updateBuy = buy.filter((el) => {
            let match = sell.find((el2) => el2.sellPrice === el.buyPrice && el2.isEqual === false)

            if (match) {
                console.log("dsadsdsads", el.buyQty, match.sellQty)
                id = el._id

               // let qty = el.buyQty - match.sellQty
                // console.log(qty)
                // if (qty < 0) {
                //     qty = Math.abs(qty)
                //     console.log(qty)
                //     return { ...el.buyQty=qty, isEqual: false }
                // }
                // console.log("match", match, qty) 

                return { ...el.isEqual=true }

            } else {
                return el
            }


        })
        console.log(updateBuy, id)

        let newUpdate = updateBuy.filter((el) => el._id == id)
        console.log(newUpdate)
        axios.patch(`https://fair-erin-viper-kilt.cyclic.app/updatebuy/${id}`, newUpdate[0])
            .then((res) => {
                console.log(res.data)
                dispatch(updateBuySuccess(res.data))

            }).catch((err) => console.log(err))


    }







    useEffect(() => {
        updateData()
        updateSeData()

    }, [buy.length])



    return (
        <Box>
            <Box w={'50%'} margin={'auto'} display={'flex'} justifyContent="space-evenly">
                <AddOrder updateBuyData={updateData} getBuyData={fetchData} />
                <SellOrder getSellData={fetchData} />
{/* <Button onClick={updateSeData}>Update</Button> */}
            </Box>



            <Heading textAlign={'center'} mt='70px'>Pending Order Table</Heading>
            <Box justifyContent={'space-between'} padding={'20px 180px'} display={'flex'}>

                <Box mt='30px' justifyContent={'center'} gap={20} display={'flex'}>
                    <TableContainer >
                        <Table bg='pink' color={'blue'} >
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
                                    buy?.map((el) => {
                                        if (el.isEqual == false) {
                                            return <Tr key={el._id} >
                                                <Td border={"3px solid teal"}>
                                                    {el.buyPrice}
                                                </Td>
                                                <Td border={"3px solid teal"}>
                                                    {el.buyQty}
                                                </Td>
                                            </Tr>
                                        }
                                    })

                                }

                            </Tbody>
                        </Table>
                    </TableContainer>


                    <TableContainer>
                        <Table bg='pink' color={'blue'} >
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
                                    sell?.map((el) => {
                                        if (el.sellQty > 0) {
                                            return <Tr key={el._id} >
                                                <Td border={"3px solid teal"}>
                                                    {el.sellPrice}
                                                </Td>
                                                <Td border={"3px solid teal"}>
                                                    {el.sellQty}
                                                </Td>
                                            </Tr>

                                        }


                                    })
                                }

                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box>
                    <Heading mb='50px'>Complete Order</Heading>
                    <TableContainer>
                        <Table bg='pink' color={'blue'} >
                            <Thead >
                                <Tr  >
                                    <Th border={"3px solid teal"}>
                                         Price
                                    </Th>
                                    <Th border={"3px solid teal"}>
                                        Quantity
                                    </Th>
                                </Tr>

                            </Thead>
                            <Tbody>
                                {
                                    buy?.map((el) => {
                                        if (el.isEqual == true) {
                                            return <Tr key={el._id} >
                                                <Td border={"3px solid teal"}>
                                                    {el.buyPrice}
                                                </Td>
                                                <Td border={"3px solid teal"}>
                                                    {el.buyQty}
                                                </Td>
                                            </Tr>

                                        }


                                    })
                                }

                            </Tbody>
                        </Table>
                    </TableContainer>

                </Box>
            </Box>
        </Box>
    )
}
