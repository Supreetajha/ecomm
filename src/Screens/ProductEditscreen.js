import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import axios from 'axios'

//My components
import FormContainer from '../Components/FormContainer'
import {listProductDetails,updateProduct} from '../Actions/productActions'

import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { PRODUCT_UPDATE_RESET } from '../Constants/productConstants'


function ProductEditscreen({match,history}) {

    const productId = match.params.id

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [image,setImage] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')
    const [uploading,setUploading] = useState(false)
    
    const dispatch = useDispatch()
    
    const productDetails = useSelector(state=>state.productDetails)
    const {loading,error,product:newProduct} = productDetails

    const productUpdate = useSelector(state=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate

    useEffect(()=>{
        if(successUpdate) {
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push("/admin/productlist")
        } else{
            if(!newProduct.name || newProduct._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            } else {
                if(name !== newProduct.name)
                {
                    setName(newProduct.name)
                    setPrice(newProduct.price)
                    setBrand(newProduct.brand)
                    setCategory(newProduct.category)
                    setImage(newProduct.image)
                    setCountInStock(newProduct.countInStock)
                    setDescription(newProduct.description)
                }
            }
        }


    },[dispatch,productId,newProduct,successUpdate])

    const handleEdit = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:newProduct._id,
            name,
            price,
            brand,
            category,
            image,
            countInStock,
            description}))
    }
    const uploadImage = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }

    }
    return(
        <div>
            <Link to="/admin/productlist">
             Go Back
            </Link>

            {loading && <Loader />} 
            {error && <Message variant="danger">{error}</Message>}  


            <FormContainer>
            
            <Form onSubmit = {handleEdit}>
                <h2>Edit Product</h2>  
                {loadingUpdate && <Loader />} 
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}  
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter product name"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)} 
                   />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter price"
                    value = {price}
                    onChange = {(e) => setPrice(e.target.value)} 
                   />
                </Form.Group>
                {uploading && <Loader />}
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Image"
                    value = {image}
                    onChange = {(e) => setImage(e.target.value)} 
                   />
                   <Form.Control
                    type ="file"
                    controlId="image-file"
                    label="Choose file to upload"
                    custom
                    onChange = {uploadImage}
                   />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Brand"
                    value = {brand}
                    onChange = {(e) => setBrand(e.target.value)} 
                   />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Category"
                    value = {category}
                    onChange = {(e) => setCategory(e.target.value)} 
                   />
                </Form.Group>
                <Form.Group className="mb-3" controlId="countinstock">
                    <Form.Label>Stock Level</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter Stock Level"
                    value = {countInStock}
                    onChange = {(e) => setCountInStock(e.target.value)} 
                   />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter description"
                    value = {description}
                    onChange = {(e) => setDescription(e.target.value)} 
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

export default ProductEditscreen