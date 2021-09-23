import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
//My components
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Advertisement from '../Components/Advertisement'
//actions
import {listProducts} from '../Actions/productActions'

function Homescreen({history}) {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products,error,loading} = productList

    let keyword = history.location.search
    
    useEffect(()=>{
        dispatch(listProducts(keyword))
        
    }, [dispatch,keyword])


    return (
   <div>
       {loading ? <Loader />
                : error ? <Message variant="danger">{error}</Message>
                    : (<>
                        <Advertisement />
                       <Row>
                        {products.map(product => (
                            <Col key={product._id} xs={6} sm={4} lg={6} xl={4}>
                            <Product product={product} />
                            </Col>
                        ))}
                    
                    </Row>
                    </> )
        }
    </div>
    
    )

}

export default Homescreen