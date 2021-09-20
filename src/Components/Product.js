import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';

//My components
import Rating from './Rating'

//&#8377; is the html for indian rupee
function Product({product}) {
    return(
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img className="my-3" src={product.image} />
            </Link>
            
            <Card.Body>
                <Link to={`/product/${product._id}`} className ="text-decoration-none">
                    <Card.Title as ="div">
                       <strong>{product.name}</strong> 
                    </Card.Title>
                </Link>
                
                <Card.Text as = "div">
                    <div className = "my-3">
                        <Rating value={product.rating} text = {`${product.numReviews} reviews`} color='#f8e825'/>
                    </div>
                
                </Card.Text>
                
                <Card.Text as = "h3">
                  &#8377;{product.price}
                </Card.Text>
            </Card.Body>

        </Card>
    )
}
export default Product