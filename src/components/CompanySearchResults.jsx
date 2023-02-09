import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Job from './Job'
import { useParams } from 'react-router-dom'



const CompanySearchResults = () => {
  
  const [jobs, setJobs] = useState([])
  const params = useParams()

  const baseEndpoint = 'https://strive-benchmark.herokuapp.com/api/jobs?search='

  useEffect(() => {
    getJobs()
  }, [])

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.companyName,{
   
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzY3ZmU3MzczODAwMTUzNzQzN2IiLCJpYXQiOjE2NzU5NDY2MjgsImV4cCI6MTY3NzE1NjIyOH0.wWIbnvwBmQ7k6VwY-lIeOx-JbXs9ZtFzF1Oz_1ecXI8"
          }
          
      })
      if (response.ok) {
        const { data } = await response.json()
        setJobs(data)
        console.log(data)
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
    
        <Col>
  
          {jobs.map((jobData) => (
         
            <Job key={jobData._id} data={jobData} />
        
         
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default CompanySearchResults
