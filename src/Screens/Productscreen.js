import { Image,Row,Col,ListGroup,Card,Button,Form } from "react-bootstrap";
import {Link} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux'
import { useEffect,useState } from "react";
//My Components
import Rating from '../Components/Rating'
import {listProductDetails} from '../Actions/productActions'
import Message from '../Components/Message'
import Loader from "../Components/Loader";


function Productscreen({match,history}) {
 
 const dispatch = useDispatch()
 const [qty,setQty] = useState(1)
 const productDetails = useSelector(state => state.productDetails);
 const {product,loading,error} = productDetails

 useEffect(()=>{
    dispatch(listProductDetails(match.params.id))
 },[dispatch,match.params.id])

 const handleAddToCart = ()=> {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
 }

 return(
     <div>
        {loading? <Loader />
                : error? <Message variant="danger">{error}</Message>    
                : <>
                    <Link to="/" className = "btn btn-light my-3">Go Back</Link>
                        <Row>
                        <Col md={6}>
                        <Image src={product.image} alt ={product.name} fluid/>
                        </Col>
                
                        <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong>{product.name}</strong>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text = {`${product.numReviews} reviews`} color='#f8e825'/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            &#8377;{product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                        <Col md={3}>
                    <Card className="my-3 p-3">
                        <ListGroup variant = "flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>
                                        &#8377;{product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>
                                        {product.countInStock? 'In stock': 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock
                             ?(<ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col xs='auto' className='my-1'>
                                        
                                        <Form.Control 
                                            as="select"    
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}                                          
                                        </Form.Control>
                                       
                                    </Col>
                                </Row>
                            </ListGroup.Item>):null}

                            <ListGroup.Item className="d-grid gap-2">
                                <Button className="my-3" variant = "dark" onClick = {handleAddToCart}
                                type="button" disabled={!product.countInStock}>
                                Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                        
                    </Card>
                </Col>
                        </Row>
                    </>

    } 
        


     </div>
 )
}

export default Productscreen