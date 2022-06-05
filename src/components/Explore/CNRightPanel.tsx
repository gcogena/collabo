import { AuthorNode,CommunityCount } from '../../types'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import "../../styles/filter.css"
import { MdFormatColorFill } from 'react-icons/md'
import { BiShapeCircle } from 'react-icons/bi'


interface CNRightPanelParams {
  author_rank: AuthorNode[];
  color_rank: CommunityCount[];
  centrality_range: number[];
  color: string;
  centrality: string;
  data: AuthorNode;
}

const CNRightPanel: React.FC<CNRightPanelParams> = ({ data, color, centrality, centrality_range, 
  color_rank, author_rank}) => {

  const Authors = (
    <div className="legend">
      <div className="legend-header">
        <div></div>
        <div>Name</div> 
        <div>Papers</div>
      </div>
      { author_rank.map((author:AuthorNode)=> 
          <div className="legend-container">
            <div className="legend-color" style={{ backgroundColor: author.color}}></div>
            <div>{author.name}</div> 
            <div>{author.paper_count}</div>
          </div>
        )
      }
    </div>
  )

  const Color = (
    <div className="legend">
      <div className="legend-header">
        <div></div>
        <div>{ color==="Affiliation" ? "Institution" : "Community ID" }</div> 
        <div>Authors</div>
      </div>
      { color_rank.map((rank:CommunityCount)=>
          <div className="legend-container">
            <div className="legend-color" style={{ backgroundColor: rank.color}}></div>
            <div>{rank.id}</div> 
            <div>{rank.count}</div>
          </div> 
        )
      }
    </div>
  )

  const Centrality = (
      <div className="centrality-container">
        { centrality_range.map((value:number, index:number)=> 
            (index+1) % 2 === 1 ?
            <div className="centrality">
              <div style={{ width:((index+3)/2).toString().concat("mm"), height:((index+3)/2).toString().concat("mm"), 
                backgroundColor:"midnightblue", borderRadius:"100%", margin:"auto" }}></div>
              { value.toExponential(2) }
            </div> : <></>
        )}
      </div>
  )

  return (
  
    <>
      <Accordion className="accordion right-panel">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <MdFormatColorFill style={{ fontSize: "13pt", marginRight:"10px"}} />
          {color}
        </Accordion.Header>
        <Accordion.Body className="scroll">
          <div className="top-title">Top 20 { color==="Author"|| color==="Affiliation" ? color.concat("s") : 
                       "Communities ".concat(color.substring(10, color.length)) }</div>
          <br/>
          { color ==="Author" ? Authors : Color }
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <BiShapeCircle style={{ fontSize: "13pt", marginRight:"10px"}}/>
          {centrality}
        </Accordion.Header>
        <Accordion.Body >
        {Centrality}
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      
      <Card className="auth-details">
      <Card.Header>Node Details</Card.Header>
      <Card.Body>
        <Card.Title>{ data.name }</Card.Title>
        <Card.Subtitle>{ data.affiliation }</Card.Subtitle>
        <Card.Text>
        { 
          data.id==="" ? <h3>Click a node to view its details</h3> :
          <>
            <br/>
            <ul>
              <li>Paper count: { data.paper_count }</li>
              <li>Degree centrality: { data.degree }</li>
              <li>Betweenness centrality: { data.betweenness }</li>
              <li>Closeness centrality: { data.closeness }</li>
              <li>Eigenvector centrality: { data.eigenvector }</li>
              <li>Leiden community ID: { data.leiden.id }</li>
              <li>SBM community ID: { data.sbm.id  }</li>
            </ul>
          </>
        }
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}

export default CNRightPanel;
