import { Box, Button, Heading, Table, Tbody, Thead, Th, Tr, Td, TableContainer } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { AddOrder } from './BuyOrder'
import { SellOrder } from './SellOrder'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getBuySuccess, getSellSuccess, updateBuySuccess, updateSellSuccess } from '../redux/action'
import { store } from '../redux/store'
import { postBuySuccess } from '../redux/action'
import { CompleteOrder } from './CompleteOrder'
export const PendingOrder = () => {

    const dispatch = useDispatch()
    const { buy, sell } = useSelector((store) => store)




    // const fetchData=async()=>{
    //       try{
    //         let data1=await axios.get(`http://localhost:4500/buydata`)
    //         let data2=await axios.get(`http://localhost:4500/selldata`)

    //         const buyData=data1.data
    //        const sellData=data2.data

    //        const updateBuy=sellData.map((el)=>{
    //         const match=buyData.find((el2)=> el2.buyPrice===el.sellPrice )
    // console.log(match)
    //         if(match){
    //             console.log(sellData)
    //             console.log("qty",match.buyQty,el.sellQty,el._id)
    //             const qty=el.sellQty-match.buyQty
    //             return {...el,sellQty:qty}
    //         }else{
    //             return el
    //         }

    //        })
    // let upData=""
    //        const updateSell=buyData.map((el)=>{
    //         const match=sellData.find((el2)=> el2.sellPrice===el.buyPrice )

    //         if(match){
    //             upData=el._id
    //             const qty=el.buyQty-match.sellQty
    //             return {...el,buyQty:qty,isEqual: true}

    //         }else{
    //             return el
    //         }

    //        })

    //        console.log("upBuy",updateBuy,updateSell,upData)
    // let newData=updateSell.filter((el)=>el._id==upData)

    //        axios.patch(`http://localhost:4500/updatebuy/${upData}`,newData[0])
    //        .then((res)=>{
    //         console.log(res.data)

    //        }).catch((err)=>console.log(err))


    // dispatch(getBuySuccess(buyData))
    // dispatch(getSellSuccess(sellData))
    //       }catch(err){
    //         console.log(err)
    //       }
    // }

    const fetchData = async () => {
        try {
            let data1 = await axios.get(`http://localhost:4500/buydata`)
            let data2 = await axios.get(`http://localhost:4500/selldata`)

            const buyData = data1.data
            const sellData = data2.data
            dispatch(getBuySuccess(buyData))
            dispatch(getSellSuccess(sellData))
            console.log(sellData, buyData)
            let id = ""
            const updateSellData = sellData.map((el) => {
                const same = buyData.find((el1) => el1.buyPrice == el.sellPrice)
                if (same) {
                    id = same._id
                    let qty = el.sellQty - same.buyQty
                    console.log(qty)
                    if(qty<0){
                        return {...el,buyQty:qty}
                    }else if(qty>0){
                        return { ...el, sellQty: qty }
                    }else{
                        return {...el,isEqual:true}
                    }
                  
                 
                }else{
                    return el
                }
            })

            console.log(id)
console.log("sellData",updateSellData)

let newData=updateSellData.filter((el)=>el._id==id)

           axios.patch(`http://localhost:4500/updatebuy/${id}`,newData[0])
           .then((res)=>{
            console.log(res.data)
             
           }).catch((err)=>console.log(err))


        } catch {
            ((err) => console.log(err))
        }

    }
    useEffect(() => {
        fetchData()

    }, [])

const updateBuyData=()=>{
    
}


    console.log('update Store', buy, sell)
    buy?.sort((a, b) => b.buyPrice - a.buyPrice)

    sell?.sort((a, b) => a.sellPrice - b.sellPrice)



    return (
        <Box>
            <Box w={'50%'} margin={'auto'} display={'flex'} justifyContent="space-evenly">
                <AddOrder getBuyData={fetchData} />
                <SellOrder getSellData={fetchData} />

            </Box>



            {/* <Heading textAlign={'center'} mt='70px'>Pending Order Table</Heading> */}
            <Box justifyContent={'space-between'} padding={'20px 180px'} display={'flex'}>
                <Box mt='30px' justifyContent={'center'} gap={20} display={'flex'}>
                    <TableContainer >
                        <Table bg='skyblue' color={'orange'} >
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
                                    sell?.map((el) => {

                                        return <Tr key={el._id} >
                                            <Td border={"3px solid teal"}>
                                                {el.sellPrice}
                                            </Td>
                                            <Td border={"3px solid teal"}>
                                                {el.sellQty}
                                            </Td>
                                        </Tr>


                                    })
                                }

                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                    hi this is for complete order
                    <CompleteOrder />
                </Box>
            </Box>
        </Box>
    )
}
