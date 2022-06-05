import PaperPerYearGraph from "../components/DataStories/PaperPerYear"
import PaperPerAuthor from "../components/DataStories/PaperPerAuthor"
import "../styles/datastories.css"
import AuthorPerAffiliation from "../components/DataStories/AuthorPerAffiliation"
import { GraphListData } from "../components/DataStories/GraphListData"
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'


interface DataStoriesParams {
  changeSidebar: Function;
}

const DataStories: React.FC<DataStoriesParams> = ({ changeSidebar }) => {
  useEffect(() => {
      changeSidebar('Data Stories')
  },[])

  const [selectedGraph, setSelectedGraph] = useState('Data Story Description') 
  const [description, setDescription] = useState('Click a data story to view its description') 

  return (
    <div className="data-stories">
      <div>
        <Card className="data-details">
          <Card.Header>Available Data Stories</Card.Header>
          <Card.Body>
            <Card.Text>
              <ul>{
                GraphListData.map((data, index) => {
                  return <Link to={""} onClick={ ()=>{ setSelectedGraph(data.title); setDescription(data.desc) } }>
                    <li key={ index } >{ data.title }</li>
                  </Link> 
                })
              }
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="data-details">
          <Card.Header>{ selectedGraph }</Card.Header>
          <Card.Body>
            <Card.Text className="desc">
              { description }
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      


      {(() => {
        switch (selectedGraph) {
          case GraphListData[0]["title"]:
            return  <PaperPerYearGraph title={ GraphListData[0]["title"] } />
          case GraphListData[1]["title"]:
            return <PaperPerAuthor title={ GraphListData[1]["title"] } /> 
          case GraphListData[2]["title"]:
            return <AuthorPerAffiliation title={ GraphListData[2]["title"] }/> 
          default:
            return null
        }
      })()} 
         
    </div>
    
  )
}

export default DataStories;