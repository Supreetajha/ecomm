import {useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {getUserList,deleteUser} from '../Actions/userActions'

//My components
import Loader from '../Components/Loader'
import Message from '../Components/Message'

function UserListscreen ({history}) {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userList = useSelector(state => state.userList)
    const {loading,error,users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete} = {userDelete}

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin)  {
           dispatch(getUserList()) 
        }else{
            history.push('/login')
        }
    },[dispatch,userInfo,history,successDelete])

    function deleteHandler(id,name){
        if(window.confirm(`Delete user ${name}?`)){
            dispatch(deleteUser(id))
        }
    }

    return loading? (<Loader/>)
                  : error? (<Message variant="danger">{error}</Message>)
                        : (
                            <Table striped bordered hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>EDIT/DELETE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id,user.name)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </Table>
                    )
    }
        


export default UserListscreen