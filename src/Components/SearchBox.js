import {Button,Form,FormControl} from 'react-bootstrap'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

function SearchBox() {
    let history= useHistory()
    const [keyword,setKeyword] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}`)
        }else{
            history.push(history.push(history.location.pathname))
        }
    }
    return(
        <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="mr-5"
                name="q"
                aria-label="Search"
                value={keyword}
                onChange = {(e)=> setKeyword(e.target.value)}
            />
            <Button variant="outline-success" className="p-2" onClick={handleSubmit}>Search</Button>
    </Form>

    )

}

export default SearchBox