import { useState } from 'react'
import { Container, Row, Col, Form,Button } from 'react-bootstrap'
import Job from './Job'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const MainSearch = () => {
  const length=useSelector((state)=>state.favourites.content.length)
  const dispatch=useDispatch()
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()
  const baseEndpoint = 'https://strive-benchmark.herokuapp.com/api/jobs?search='
 
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(baseEndpoint + query + '&limit=20',{

        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzY3ZmU3MzczODAwMTUzNzQzN2IiLCJpYXQiOjE2NzU5NDY2MjgsImV4cCI6MTY3NzE1NjIyOH0.wWIbnvwBmQ7k6VwY-lIeOx-JbXs9ZtFzF1Oz_1ecXI8"
          }
          
    })
      if (response.ok) {
        const { data } = await response.json()
        setJobs(data)
      } else {
        alert('Error fetching results')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Row>
  
        <Col xs={10} className="mx-auto my-3">
          <h1>Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
          <Button color="primary" onClick={() => navigate('/favourites')}>
        <FaShoppingCart />
        <span className="ml-2">0</span>
      </Button>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((jobData) => (
         <>
            <Job  data={jobData} />
            <Button  color="primary" onClick={() => {
                //  dispatch({
                //   type:"ADD-TO-CART",
                //    payload:jobData.id,
                   
                // })
        }}> ADD TO FAVOURITES</Button>
            </>
            
            
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default MainSearch
