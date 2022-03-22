import { Community, Node } from "../types"
import Graph from "../components/graph"
import "../styles/graph.css"
import LeftPanel from "../components/LeftPanel"
import RightPanel from "../components/RightPanel"
import { useState } from 'react'
import { SigmaContainer, ControlsContainer, ZoomControl, ForceAtlasControl } from "react-sigma-v2";
import { toNumber } from "neo4j-driver-core"

import Slider from '@mui/material/Slider';
import { StyledEngineProvider } from '@mui/material/styles';
import { BiSearchAlt } from 'react-icons/bi'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import  Spinner from 'react-bootstrap/Spinner'

const degree_range = require('../data/range.json').degree_range;
const betweenness_range = require('../data/range.json').betweenness_range;
const closeness_range = require('../data/range.json').closeness_range;
const eigenvector_range = require('../data/range.json').eigenvector_range;

function Explore (){
    const [clickedNode, setClickedNode] = useState<Node>(
        {
          id: "",
          name: "",
          affiliation: "",
          degree: 0,
          betweenness: 0,
          closeness:0,
          eigenvector: 0,
          leiden: "",
          sbm: "",
          topic: "",
          paper_count: 0,
          color: ""
        }
      );
    
      const onNodeClick = (e:Node)=> {
        setClickedNode(e);
      }

    const[centralityRange, setCentralityRange] = useState(degree_range); 

    const [centrality,setCentrality] = useState('Degree Centrality');
    const handleCentralityChange=(e:any)=>{
        if(e.target.value === 'Degree Centrality') setCentralityRange(degree_range)
        else if(e.target.value === 'Betweenness Centrality') setCentralityRange(betweenness_range)
        else if(e.target.value === 'Closeness Centrality') setCentralityRange(closeness_range)
        else setCentralityRange(eigenvector_range)

        setCentrality(e.target.value)
    }

    const [year, setYear] = useState('2020');
    const handleYearChange=(e:any)=>{
        setYear(e.target.value.toString())
    } 

    const [color, setColor] = useState('Author');
    const handleColorChange=(e:any)=>{
        setColor(e.target.value)
    }

    const [query, setQuery] = useState('');
    const handleQueryInput = (e:any)=>{
        setQuery((document.getElementById("search") as HTMLInputElement).value);
        e.preventDefault(); 
    }

    const marks = [
        {
          value: 1960,
          label: '1960',
        },
        {
          value: 1970,
          label: '1970',
        },
        {
          value: 1980,
          label: '1980',
        },
        {
          value: 1990,
          label: '1990',
        },
        {
            value: 2000,
            label: '2000',
        },
        {
            value: 2010,
            label: '2010',
        },
        {
            value: 2020,
            label: '2020',
          }
    ];

    const [colorRank, setColorRank] = useState<Community[]>([]);
    const getColorRank = (rank:Community[]) => {
        setColorRank(rank);
    }
    
    const [authorsRank, setAuthorsRank] = useState<Node[]>([]);
    const getAuthorsRank = (authors:Node[]) => {
        setAuthorsRank(authors);
    }

    const [names, setNames] = useState<string[]>([]);
    const getNames = (nameList:string[]) => {
        setNames(nameList);
    }

    const resetGraph = () => {
        setQuery("")
        setColor("Author")
        setCentrality("Degree Centrality")
        setClickedNode({
            id: "",
            name: "",
            affiliation: "",
            degree: 0,
            betweenness: 0,
            closeness:0,
            eigenvector: 0,
            leiden: "",
            sbm: "",
            topic: "",
            paper_count: 0,
            color: ""
          })
        setYear("2020")
    }

    return (
        <>
            <SigmaContainer className="graph-window" style={{ height: "100%", width: "100%" }}>

                <Graph year={ year } centrality={ centrality } community={ color } 
                clickedNode={ clickedNode } onNodeClick={ onNodeClick }  query={ query }
                getRank={ getColorRank } getAuthors={ getAuthorsRank } getAuthorNames={ getNames }/>

                <ControlsContainer className="control-container" position={"top-left"}>
                    <div className="year">
                        Collaboration Network
                        <h2>1960 to { year }</h2>
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
                    
                    <LeftPanel onColorChange={handleColorChange} onSizeChange={handleCentralityChange}/>

                    <button className="reset-btn" onClick={ resetGraph }>Reset</button>
                </ControlsContainer>

                <ControlsContainer className="graph-control control-container" position={"bottom-left"}>
                    <ZoomControl />
                    <ForceAtlasControl autoRunFor={1000} />
                </ControlsContainer>

                <ControlsContainer className="control-container" position={"top-right"}>
                    <RightPanel data={ clickedNode } color={ color } centrality={ centrality }
                        centrality_range={ centralityRange } color_rank={ colorRank }
                        author_rank={ authorsRank }
                        />
                </ControlsContainer>
            </SigmaContainer>

            <div className="slider-box graph-control">
                <h4 className="slider-title">Coverage <br/>Years</h4>
            <StyledEngineProvider injectFirst>
                    <Slider
                    style={{ width: "90%", marginRight:"5px" }}
                    defaultValue={2020}
                    min={1960}
                    max={2020}
                    value={toNumber(year)}
                    aria-label="Year Slider"
                    valueLabelDisplay="auto"
                    onChange={handleYearChange} 
                    marks={marks}
                    />
                </StyledEngineProvider>
            </div>

        </>
    )
}

export default Explore
