
    import {useState,useEffect} from 'react'
    import {useDispatch,useSelector} from 'react-redux'
    import Form from 'react-bootstrap/Form'
    import Button from 'react-bootstrap/Button'
    import Row from 'react-bootstrap/Row'
    import Col from 'react-bootstrap/Col'
    import Table from 'react-bootstrap/Table'
    import { LinkContainer } from 'react-router-bootstrap'

    //My components
    
    import {getUserDetails,updateUserProfile} from '../Actions/userActions'
    import { listMyOrders } from '../Actions/orderActions'
    
    import Loader from '../Components/Loader'
    import Message from '../Components/Message'
    import { USER_UPDATE_PROFILE_RESET } from '../Constants/userConstants'

    function Profilescreen({location,history}) {
        
        const userLogin = useSelector(state=>state.userLogin)
        const {userInfo} = userLogin

        const [name,setName] = useState()
        const [email,setEmail] = useState()
        const [password,setPassword] = useState()
        const [confirmPassword,setConfirmPassword] = useState()
     
    
        const dispatch = useDispatch()
        
        const userDetails = useSelector(state=>state.userDetails)
        const {loading,error,user} = userDetails

        const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
        const {success} = userUpdateProfile

        const orderListMy = useSelector(state=>state.orderListMy)
        const {loading:loadingOrders,error:errorOrders,orders} = orderListMy

        useEffect(()=>{
            if(!userInfo){
                history.push("/login")
            }else {
                if (!user || !user.name || success || userInfo.id !== user._id) {                
                    dispatch(getUserDetails('profile'))
                    dispatch(listMyOrders())
                    dispatch({type:USER_UPDATE_PROFILE_RESET})
                }
                else{
                    setEmail(user.email)
                    setName(user.name)
                }
            }
        },[dispatch,userInfo,history,user,success])
    
        const handleUpdate = (e) => {
            e.preventDefault()
            dispatch(updateUserProfile(
                {'id':user._id,
                'name':name,
                'email':email,
                'password':password}))
        }
        return(
            <Row>
                <Col sm={3}>
                    {loading && <Loader />}
                    {error && <Message variant ="danger">{error}</Message>}
                    <Form onSubmit = {handleUpdate}>
                        <h2>User Profile</h2>  
                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter your name"
                            value = {name}
                            onChange = {(e) => setName(e.target.value)} 
                            required />
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            required />
                            <Form.Text className="text-muted">
                                Please enter a valid email id 
                            </Form.Text>
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}  
                            />
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Confirm Password"
                            value = {confirmPassword}
                            onChange = {(e) => setConfirmPassword(e.target.value)}  
                            />
                        </Form.Group>
                        {confirmPassword && (password !== confirmPassword) &&
                        <Message variant="danger">Passwords do not match </Message>}
        
                        <Button variant="primary" 
                        type="submit" 
                        disabled = {confirmPassword && (password !== confirmPassword)}
                        onClick= {handleUpdate}>
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <h2>My Orders</h2>
                    {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>&#8377;{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                </Col>
                
            </Row>
                

            )
}

export default Profilescreen