import React from 'react'
import { AuthorTopicNode, Topic } from '../../types'
import Card from 'react-bootstrap/Card'
import "../../styles/filter.css"
import Accordion from 'react-bootstrap/Accordion'
import { MdFormatColorFill } from 'react-icons/md'

interface TopicRightPanelParam {
  data: AuthorTopicNode;
  selectedTopic: string;
  specificTopic: string;
  specificTopicDetails: Topic;
  topicList: Topic[];
}

const TopicRightPanel: React.FC<TopicRightPanelParam> = ({ data, selectedTopic, specificTopic, specificTopicDetails, topicList }) => {
  const topic:Topic = data.topic;

  const Topics = (
    <div className="legend">
      <div className="legend-header">
        <div></div>
        <div>Topic ID</div> 
        <div>Authors</div>
      </div>
      { (topicList.sort(function(a, b) { return b.count - a.count })).map((topic:Topic)=> 
          <div className="legend-container">
            <div className="legend-color" style={{ backgroundColor: topic.color }}></div>
            <div>{topic.id}</div> 
            <div>{topic.count}</div>
          </div>
        )
      }
    </div>
  )

  return (
    <>
      <Accordion className="accordion right-panel">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <MdFormatColorFill style={{ fontSize: "13pt", marginRight:"10px"}} />
            { selectedTopic }
            {/* {specificTopic !== '' ? "Specific Topic: "+ specificTopic : selectedTopic} */}
          </Accordion.Header>
          <Accordion.Body className="scroll">
            { Topics }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Card className="auth-details">
        <Card.Header>Node Details</Card.Header>
        <Card.Body>
          { specificTopic !== '' ? 
            <>
              <Card.Title>Topic { specificTopic }</Card.Title>
              <Card.Subtitle>{ specificTopicDetails.terms }</Card.Subtitle> 
              <hr></hr>
            </> : <></>
          }
          <Card.Title>{ data.name }</Card.Title>
          <Card.Subtitle>{ data.affiliation }</Card.Subtitle>
          <Card.Text>
          { 
            data.id ==="" ? <h3>Click a node to view its topic details</h3> :
            topic.color ==="#000000" ? 
              specificTopic !== '' ? 
                <><br/><span>Topic {specificTopic}: Not in Author's Top 10 Studied Topics</span></> :
                <><br/><span>Topics for this author is not available.</span></> 
              : specificTopic !== '' ? 
                  <>
                    <br/>
                    <span>Rank of Topic {specificTopic}: { topic.id }</span>
                    <br/>
                    <span>Gamma Score: { topic.gamma }</span>
                  </>  :
                  <>
                    <br/>
                    <ul>
                      <li>Most Researched Topic: { topic.id }</li>
                      <li>Gamma Score: { topic.gamma }</li>
                      <li>Terms associated: 
                          <ol>
                          {
                            topic.terms.split(",").map((term:string)=><li>{term}</li>)
                          }
                          </ol>
                      </li>
                    </ul>
                  </> 
          }
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default TopicRightPanel;