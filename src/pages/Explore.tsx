import { CommunityCount, AuthorNode } from "../types"
import Graph from "../components/Explore/CoauthorshipData"
import "../styles/explore.css"
import CNLeftPanel from "../components/Explore/CNLeftPanel"
import CNRightPanel from "../components/Explore/CNRightPanel"
import YearSlider from "../components/Explore/YearSlider"
import { useEffect, useState } from 'react'
import { SigmaContainer, ControlsContainer, ZoomControl, ForceAtlasControl } from "react-sigma-v2";

import { BiSearchAlt } from 'react-icons/bi'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

interface ExploreParams {
    changeSidebar: Function;
}

const Explore: React.FC<ExploreParams> = ({ changeSidebar }) => {
    useEffect(() => {
        changeSidebar('Explore')
    },[])

    const [clickedNode, setClickedNode] = useState<AuthorNode>(
        {
          id: "",
          name: "",
          affiliation: "",
          degree: 0,
          betweenness: 0,
          closeness:0,
          eigenvector: 0,
          leiden: {id:"", color:""},
          sbm: {id:"", color:""},
          paper_count: 0,
          color: "",
          affiliation_color: "",
            degree_size: 0,
            betweenness_size: 0,
            closeness_size: 0,
            eigenvector_size: 0
        }
      );
    
    const onNodeClick = (e:any)=> {
    setClickedNode(e);
    }

    const [year, setYear] = useState('2020');
    const handleYearChange=(e:any)=>{
        setYear(e.target.value.toString())

        if(centrality === 'Degree Centrality') setCentralityRange(range["degree_range"][e.target.value.toString()])
        else if(centrality === 'Betweenness Centrality') setCentralityRange(range["betweenness_range"][e.target.value.toString()])
        else if(centrality === 'Closeness Centrality') setCentralityRange(range["closeness_range"][e.target.value.toString()])
        else setCentralityRange(range["eigenvector_range"][e.target.value.toString()])

        setClickedNode({
            id: "",
            name: "",
            affiliation: "",
            degree: 0,
            betweenness: 0,
            closeness:0,
            eigenvector: 0,
            leiden: {id:"", color:""},
            sbm: {id:"", color:""},
            paper_count: 0,
            color: "",
            affiliation_color: "",
            degree_size: 0,
            betweenness_size: 0,
            closeness_size: 0,
            eigenvector_size: 0
          })
    } 

    const [color, setColor] = useState('Author');
    const handleColorChange=(e:any)=>{
        setColor(e.target.value)
    }

    const range = require('../data/centralities-range.json')
    const[centralityRange, setCentralityRange] = useState(range["degree_range"][year]); 

    const [centrality,setCentrality] = useState('Degree Centrality');
    const handleCentralityChange=(e:any)=>{
        if(e.target.value === 'Degree Centrality') setCentralityRange(range["degree_range"][year])
        else if(e.target.value === 'Betweenness Centrality') setCentralityRange(range["betweenness_range"][year])
        else if(e.target.value === 'Closeness Centrality') setCentralityRange(range["closeness_range"][year])
        else setCentralityRange(range["eigenvector_range"][year])

        setCentrality(e.target.value)
    }

    const [query, setQuery] = useState('');
    const handleQueryInput = (e:any)=>{
        setQuery((document.getElementById("search") as HTMLInputElement).value);
        e.preventDefault(); 
    }

    const [colorRank, setColorRank] = useState<CommunityCount[]>([]);
    const getColorRank = (rank:CommunityCount[]) => {
        setColorRank(rank);
    }
    
    const [authorsRank, setAuthorsRank] = useState<AuthorNode[]>([]);
    const getAuthorsRank = (authors:AuthorNode[]) => {
        setAuthorsRank(authors);
    }

    const [names, setNames] = useState<string[]>([]);
    const getNames = (nameList:string[]) => {
        setNames(nameList);
    }

    const resetGraph = () => {
        const current_color = document.getElementById("author") as HTMLInputElement
        current_color.checked = true

        const current_size = document.getElementById("degree") as HTMLInputElement
        current_size.checked = true

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
            leiden: {id:"", color:""},
            sbm: {id:"", color:""},
            paper_count: 0,
            color: "",
            affiliation_color: "",
            degree_size: 0,
            betweenness_size: 0,
            closeness_size: 0,
            eigenvector_size: 0
          })
        setYear("2020")
    }

    var limit = "1000";

    return (
        <>
            <SigmaContainer className="graph-window" style={{ height: "100%", width: "100%" }}>

                <Graph year={ year } limit={ limit } centrality={ centrality } community={ color } 
                clickedNode={ clickedNode } onNodeClick={ onNodeClick }  query={ query }
                getRank={ getColorRank } getAuthors={ getAuthorsRank } getAuthorNames={ getNames }/>

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
                    
                    <CNLeftPanel onColorChange={handleColorChange} onSizeChange={handleCentralityChange}/>

                    <button className="reset-btn" onClick={ resetGraph }>Reset</button>
                </ControlsContainer>

                <ControlsContainer className="graph-control control-container" position={"bottom-left"}>
                    <ZoomControl />
                    <ForceAtlasControl autoRunFor={1000} />
                </ControlsContainer>

                <ControlsContainer className="control-container" position={"top-right"}>
                    <CNRightPanel data={ clickedNode } color={ color } centrality={ centrality }
                        centrality_range={ centralityRange } color_rank={ colorRank }
                        author_rank={ authorsRank }
                        />
                </ControlsContainer>
            </SigmaContainer>

            <YearSlider year={ year } handleYearChange={ handleYearChange }/>
        </>
    )
}

export default Explore
