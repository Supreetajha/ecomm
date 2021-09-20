import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
//My components
import FormContainer from '../Components/FormContainer'
import {register} from '../Actions/userActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

function Registerscreen({location,history}) {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [message,setMessage] = useState()

    const dispatch = useDispatch()
    
    const userRegister = useSelector(state=>state.userRegister)
    const {loading,error,userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push("/")
        }
    },[userInfo])

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(register(name,email,password))
    }
    return(
        <FormContainer>
            {loading && <Loader />}
            {error && <Message variant ="danger">{error}</Message>}
            <Form onSubmit = {handleRegister}>
                <h2>Sign-Up</h2>  
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
                    required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm Password"
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}  
                    required/>
                </Form.Group>
                {confirmPassword && (password !== confirmPassword) &&
                 <Message variant="danger">Passwords do not match </Message>}

                <Button variant="primary" 
                type="submit" 
                disabled = {confirmPassword && (password !== confirmPassword)}
                onClick= {handleRegister}>
                    Submit
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Alredy have an account? <Link
                        to="/login">
                        Sign-in
                        </Link>
                </Col>
            </Row>
            </FormContainer>
        )
}

export default Registerscreen