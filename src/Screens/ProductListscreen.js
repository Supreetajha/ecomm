import {useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'

//My components
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProducts,deleteProduct,createProduct } from '../Actions/productActions'
import {PRODUCT_CREATE_RESET} from '../Constants/productConstants'

function ProductListscreen ({history}) {
    console.log("ProductList")

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {success:successDelete,loading:loadingDelete,error:errorDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {success:successCreate,loading:loadingCreate,error:errorCreate,product:newProduct} = productCreate

    console.log("successCreate" + successCreate)
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${newProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, newProduct])

    function deleteHandler(id,name){
        if(window.confirm(`Delete product : ${name}?`)){
            dispatch(deleteProduct(id))
        }
    }
    function handleCreateProduct(){
        dispatch(createProduct())
    }

    return loading? (<Loader/>)
                  : error? (<Message variant="danger">{error}</Message>)
                        : (
                            <div>
                            {loadingDelete && <Loader />}
                            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
                            {loadingCreate && <Loader />}
                            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                            <Row className="justify-content-center">
                                <Col md={10}>
                                 <h1>Products</h1>
                                </Col>
                                <Col className="mr-0" md={2}>
                                    <Button className = "my-3" variant="primary" onClick={handleCreateProduct}>
                                    <i className='fas fa-plus'></i> Create Product
                                    </Button>
                                </Col>

                            </Row>
                            <Table striped bordered hover responsive size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>EDIT/DELETE</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>&#8377;{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id,product.name)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </Table>
                    </div>
                    )
    }
        


export default ProductListscreen