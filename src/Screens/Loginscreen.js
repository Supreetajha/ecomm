import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
//My components
import FormContainer from '../Components/FormContainer'
import {login} from '../Actions/userActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
function Loginscreen({location,history}) {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state=>state.userLogin)
    const {loading,error,userInfo} = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(`/${redirect}`)
        }
    },[userInfo,history,redirect])

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }
    return(
        <FormContainer>
            {loading && <Loader />}
            {error && <Message variant ="danger">{error}</Message>}
            <Form onSubmit = {handleLogin}>
                <h2>Sign-In</h2>  
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)} />
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
                    onChange = {(e) => setPassword(e.target.value)}  />
                </Form.Group>

                <Button variant="primary" 
                type="submit" onClick= {handleLogin}>
                    Submit
                </Button>

                <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to="/register">
                        Register
                        </Link>
                </Col>
            </Row>
            </Form>
            </FormContainer>
        )
}

export default Loginscreen