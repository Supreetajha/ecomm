import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
//My components
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

//actions
import {listProducts} from '../Actions/productActions'

function Homescreen() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {products,error,loading} = productList
    
    useEffect(()=>{
        dispatch(listProducts())
        
    }, [dispatch])


    return (
   <div>
       {loading ? <Loader />
                : error ? <Message variant="danger">{error}</Message>
                    : ( <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={8} lg={6} xl={4}>
                            <Product product={product} />
                            </Col>
                        ))}
                    
                    </Row> )
        }
    </div>
    
    )

}

export default Homescreen