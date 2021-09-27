import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

function Advertisement() {
 return(
    <Carousel>
        <Carousel.Item>
        <Image
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt="First slide"
            fluid
        />
        <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Image
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt="First slide"
            fluid
        />
        <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
 )
}

export default Advertisement