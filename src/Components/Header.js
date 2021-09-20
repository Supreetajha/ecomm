import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { LinkContainer} from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import {logout} from '../Actions/userActions'

function Header({ history }) {

const userLogin = useSelector(state=>state.userLogin)
const {userInfo} = userLogin

const dispatch = useDispatch()
const handleLogout = () => {
    dispatch(logout())
}
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/" exact>
                    <Navbar.Brand href="/">Proshop</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/cart">
                        <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                    </LinkContainer>
                    {userInfo ?
                    (<DropdownButton id="dropdown-basic-button" title={userInfo.name}>
                        <LinkContainer to="/profile">
                            <Dropdown.Item>
                            Profile
                            </Dropdown.Item>
                        </LinkContainer>

                        <Dropdown.Item onClick = {handleLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                    )
                    :
                    (<LinkContainer to="/login">
                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                    </LinkContainer>)
                    }
                    {userInfo && userInfo.isAdmin && 
                     (
                        <DropdownButton id="dropdown-admin-button" title="Admin" className="ml-3">
                        <LinkContainer to="/admin/userlist">
                            <Dropdown.Item>
                            Users
                            </Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/admin/productlist">
                            <Dropdown.Item>
                            Products
                            </Dropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/admin/orderlist">
                            <Dropdown.Item>
                            Orders
                            </Dropdown.Item>
                        </LinkContainer>
                        </DropdownButton>
                     )

                    }

                    </Nav>

                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header