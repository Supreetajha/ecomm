import { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

//Actions
import {addToCart,removeFromCart } from '../Actions/cartActions'

//My components
import Message from '../Components/Message'


function Cartscreen({match,location,history}) {
    const queryParams = new URLSearchParams(window.location.search);
    const qty = parseInt(queryParams.get('qty'));
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    let totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
    let totalAmount = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    
    useEffect(()=>{
        if(match.params.id){
            dispatch(addToCart(match.params.id,qty))
        }
        totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
        totalAmount = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    },[dispatch,match.params.id,qty])

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id))
    }
    const handleCheckout = () => {
        history.push('/login?redirect=shipping')
    }
    
    console.log(cartItems)
  
    return(
        <Row>
            <Col xs={12} md={8}>
                <h2>Shopping Cart</h2>
                {cartItems.length?
                                    (<ListGroup variant="flush">
                                        {cartItems.map(item => (
                                            <ListGroup.Item key={item.product}>
                                                <Row className = "align-items-start">
                                                    <Col xs={3} md={2} >
                                                        <Link to = {`/product/${item.product}`}>
                                                         <Image src={item.image} alt={item.name} fluid thumbnail/>
                                                        </Link>
                                                       
                                                    </Col>
                                                    <Col xs={3} md={3}>
                                                        <Link className = "text-decoration-none align-middle" to = {`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col xs={3} md={2} className = "py-1">
                                                       <span className="align-middle">&#8377;{item.price}</span>
                                                    </Col>
                                                    <Col xs={2} md={2} className="py-1">
                                                        <label htmlFor="qty">Qty</label> 
                                                        <select
                                                            id="qty"
                                                            value={item.qty}
                                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                        >
                                                            {

                                                                [...Array(item.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                        </select>
                                                    </Col>
                                                    <Col xs={1} md={1}>
                                                        <Button
                                                            type='button'
                                                            variant='light'
                                                            onClick={() => handleRemoveFromCart(item.product)}
                                                        >
                                                            <i className='fas fa-trash'></i>
                                                        </Button>
                                                </Col>
                                            </Row>
                                                

                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    )
                                    : <Message variant="info">Your cart is empty. <Link to="/">Start shopping</Link></Message>
                }
            </Col>

            <Col xs={8} md={4}>
            <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Total ({totalItems}) items</h3>
                            <h4>Amount &#8377;{totalAmount}</h4>
                        </ListGroup.Item>
                   

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={handleCheckout}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cartscreen