import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

//My components
import FormContainer from '../Components/FormContainer'
import {getUserDetails,updateUser} from '../Actions/userActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { USER_UPDATE_RESET } from '../Constants/userConstants'

function UserEditscreen({match,history}) {

    const userId = match.params.id

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setAdmin] = useState(false)


    const dispatch = useDispatch()
    
    const userDetails = useSelector(state=>state.userDetails)
    const {loading,error,user} = userDetails

    const userUpdate = useSelector(state=>state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = userUpdate

    useEffect(()=>{
        if (successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }
        if(!user._id || user._id!== Number(userId)){
            dispatch(getUserDetails(userId))
        } else{
            if(user.name !== name) {
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }

    },[dispatch,userId,user,successUpdate,history,name])

    const handleEdit = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:user._id,name,email,isAdmin}))
    }
    return(
        <div>
            <Link to="/admin/userlist">
             Go Back
            </Link>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading && <Loader />} 
            {error && <Message variant="danger">{error}</Message>}   

            <FormContainer>
            
            <Form onSubmit = {handleEdit}>
                <h2>Edit User</h2>  
                <Form.Group className="mb-3" controlId="Name">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter your name"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)} 
                   />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Please enter a valid email id 
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="isadmin">
                    <Form.Label>Is Admin</Form.Label>
                    <Form.Check 
                    type="checkbox" 
                    label="IsAdmin"
                    checked = {isAdmin}
                    onChange = {(e) => setAdmin(e.target.checked)}  
                   />
                </Form.Group>

                <Button variant="primary" 
                type="submit" 
                onClick= {handleEdit}>
                    Update
                </Button>
            </Form>
            </FormContainer>
       
        </div>
      )
}

export default UserEditscreen