import "../styles/explore.css"
import TopicLeftPanel from "../components/Topics/TopicLeftPanel"
import TopicRightPanel from "../components/Topics/TopicRightPanel"
import TopicData from "../components/Topics/TopicData"
import YearSlider from "../components/Explore/YearSlider"
import { useState, useEffect } from 'react'
import { SigmaContainer, ControlsContainer, ZoomControl, ForceAtlasControl } from "react-sigma-v2";
import { AuthorTopicNode, Topic } from '../types'
import { BiSearchAlt } from 'react-icons/bi'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


interface TopicsParams {
    changeSidebar: Function;
  }
  
  const Topics: React.FC<TopicsParams> = ({ changeSidebar }) => {
    useEffect(() => {
        changeSidebar('Topics')
    },[])

    const top_topics = require('../data/top_topics.json')
    const topics_per_year = require('../data/topics_per_year.json')

    const [clickedNode, setClickedNode] = useState<AuthorTopicNode>(
        {
          id: "",
          name: "",
          affiliation: "",
          topic: {"id":"","gamma":0,"terms":"", "color":"", "count":0}
        }
      );
    
    const onNodeClick = (e:AuthorTopicNode)=> {
    setClickedNode(e);
    }

    const [year, setYear] = useState('2020');
    const handleYearChange=(e:any)=>{
        setYear(e.target.value.toString())
        setTopic('Most Researched Topics of Authors')
        setTopTopicsList(top_topics[e.target.value.toString()])
        setTopicsPerYearList(topics_per_year[e.target.value.toString()])
        setClickedNode({
            id: "",
            name: "",
            affiliation: "",
            topic: {"id":"","gamma":0,"terms":"", "color":"", "count":0}
          })
    } 

    const [topic, setTopic] = useState('Most Researched Topics of Authors');
    const handleTopicChange=(e:any)=>{
        if(e.target.value == 'Most Researched Topics of Authors') setSpecificTopic('')
        setClickedNode({
            id: "",
            name: "",
            affiliation: "",
            topic: {"id":"","gamma":0,"terms":"", "color":"", "count":0}
          })
        setTopic(e.target.value)
    }

    const [specificTopic, setSpecificTopic] = useState('');
    const handleSpecificTopicChange=(e:any)=>{
        setSpecificTopic(e.target.value)
    }

    const [topTopicsList, setTopTopicsList] = useState<Topic[]>(top_topics['2020'])
    const [topicsPerYearList, setTopicsPerYearList] = useState<Topic[]>(topics_per_year['2020'])

    const [query, setQuery] = useState('');
    const handleQueryInput = (e:any)=>{
        setQuery((document.getElementById("search") as HTMLInputElement).value);
        e.preventDefault(); 
    }

    const [names, setNames] = useState<string[]>([]);
    const getNames = (nameList:string[]) => {
        setNames(nameList);
    }

    const resetGraph = () => {
        setQuery("")
        setTopic("All Topics")
        setClickedNode({
            id: "",
            name: "",
            affiliation: "",
            topic: {"id":"","gamma":0,"terms":"", "color":"", "count":0}
          })
        setYear("2020")
    }

    var limit = "1000";

  return (
    <>
        <SigmaContainer className="graph-window" style={{ height: "100%", width: "100%" }} >         

            <TopicData year={ year } limit={ limit } topic={ topic } specificTopic={ specificTopic }
            clickedNode={ clickedNode } onNodeClick={ onNodeClick }  query={ query }
            getAuthorNames={ getNames } topTopics={ topTopicsList } topicsPerYear={ topicsPerYearList } 
            />

            <ControlsContainer className="control-container" position={"top-left"}>
                <div className="year">
                    Collaboration Network
                    <h2>1960 to { year }</h2>
                    From { limit } rows of data
                </div>

                    <InputGroup className="search graph-control">
                        <FormControl
                        id="search"
                        list="suggestions"
                        placeholder="Search author"
                        aria-label="Search Author"
                        />
                        <Button variant="outline-secondary" style={{ backgroundColor:"lightgrey"}}
                            onClick={ handleQueryInput }>
                            <BiSearchAlt style={{ fontSize: "14pt"}}/>
                        </Button>
                    </InputGroup>
                        <datalist id="suggestions">
                            { names.map((name:string) => <option value={name}/>) }
                        </datalist>   
                
                <TopicLeftPanel onTopicChange={ handleTopicChange } selectedTopic={ topic } onSpecificTopicChange={ handleSpecificTopicChange } topicsPerYear={ topicsPerYearList } />

                <button className="reset-btn" onClick={ resetGraph }>Reset</button>
            </ControlsContainer>

            <ControlsContainer className="graph-control control-container" position={"bottom-left"}>
                <ZoomControl />
                <ForceAtlasControl autoRunFor={1000} />
            </ControlsContainer>

            <ControlsContainer className="control-container" position={"top-right"}>
                <TopicRightPanel data={ clickedNode } selectedTopic={ topic }  specificTopic = { specificTopic } 
                    specificTopicDetails={ topicsPerYearList[topicsPerYearList.findIndex(x => x.id.toString() === specificTopic)] } 
                    topicList={topic === "Most Researched Topics of Authors" ? topTopicsList : topicsPerYearList}/>
            </ControlsContainer>
        </SigmaContainer>

        <YearSlider year={ year } handleYearChange={ handleYearChange }/>
    </>
    )
}

export default Topics;