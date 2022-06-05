import React, { ChangeEventHandler, useEffect } from 'react';
import { Topic } from '../../types';
import Accordion from 'react-bootstrap/Accordion'
import "../../styles/filter.css"
import { MdFormatColorFill } from 'react-icons/md'

interface TopicLeftPanelParams {
  onTopicChange: ChangeEventHandler;
  selectedTopic: string;
  onSpecificTopicChange: ChangeEventHandler;
  topicsPerYear: Topic[];
}

const TopicLeftPanel: React.FC<TopicLeftPanelParams> = ({onTopicChange, selectedTopic, onSpecificTopicChange, topicsPerYear}) => {
  var isDisabled = selectedTopic !== "Most Researched Topics of Authors" ? false : true

  useEffect(()=>{
    const current_topic = document.getElementById("top") as HTMLInputElement
    current_topic.checked = true
  },[])

  return (
    <>
      <Accordion className="accordion left-panel">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <MdFormatColorFill style={{ fontSize: "13pt", marginRight:"10px"}} />
          Color nodes by:
        </Accordion.Header>
        <Accordion.Body>
        <div className="filter"> 
          <div>
            <input type="radio" value="Most Researched Topics of Authors" id="top" name="topic" onChange={onTopicChange}/>
            <label htmlFor="top">Most Researched Topics of Authors</label>
          </div>

          <div>
            <input type="radio" value="Specific Topic" id="specific" name="topic" onChange={onTopicChange}/>
            <label htmlFor="specific">Specific Topic</label>
            <select id="topic_list" className="topic_list" placeholder="Select Topic" onChange={onSpecificTopicChange} disabled={isDisabled}>
              { topicsPerYear.map((topic:Topic)=> 
                  <option className="topic_list" value={topic.id}>{topic.id} : {topic.terms} </option>
                )
              }
            </select>
          </div>
        </div>
     
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      
    </>
  )
}

export default TopicLeftPanel;