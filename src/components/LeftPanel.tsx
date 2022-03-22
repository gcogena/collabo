import { ChangeEventHandler } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import "../styles/filter.css"
import { MdFormatColorFill } from 'react-icons/md'
import { BiShapeCircle } from 'react-icons/bi'

interface LeftPanelParams {
  onColorChange: ChangeEventHandler;
  onSizeChange: ChangeEventHandler;
}

const LeftPanel: React.FC<LeftPanelParams> = ({ onColorChange, onSizeChange }) => {

  const Color = (
    <div className="filter">  
      <div>
        <input type="radio" value="Author" id="author" onChange={onColorChange} name="color" />
        <label htmlFor="author">Author</label>
      </div>

      <div>
        <input type="radio" value="Affiliation" id="affiliation" onChange={onColorChange} name="color"/>
        <label htmlFor="affiliation">Affiliation</label>
      </div>

      <div>  
        <input type="radio" value="Community (Leiden Algorithm)" id="leiden" onChange={onColorChange} name="color"/>
        <label htmlFor="leiden">Community (Leiden Algorithm)</label>
      </div>

      <div>
        <input type="radio" value="Community (Stochastic Block Model)" id="sbm" onChange={onColorChange} name="color"/>
        <label htmlFor="sbm">Community (Stochastic Block Model)</label>
      </div>
    </div>
  )

  const Centrality = (
    <div className="filter">
          <div>
            <input type="radio" value="Degree Centrality" id="degree" onChange={onSizeChange} name="centrality" />
            <label htmlFor="degree">Degree Centrality</label>
          </div>
          <div>
            <input type="radio" value="Betweenness Centrality" id="betweenness" onChange={onSizeChange} name="centrality" />
            <label htmlFor="betweenness">Betweenness Centrality</label>
          </div>
          <div>
            <input type="radio" value="Closeness Centrality" id="closeness" onChange={onSizeChange} name="centrality" />
            <label htmlFor="closeness">Closeness Centrality</label>
          </div>
          <div>
            <input type="radio" value="Eigenvector Centrality" id="eigenvector" onChange={onSizeChange} name="centrality" />
            <label htmlFor="eigenvector">Eigenvector Centrality</label>
          </div>
    </div>
  )

  return (
      <Accordion className="accordion left-panel">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <MdFormatColorFill style={{ fontSize: "13pt", marginRight:"10px"}} />
          Color nodes by:
        </Accordion.Header>
        <Accordion.Body>
          {Color}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <BiShapeCircle style={{ fontSize: "13pt", marginRight:"10px"}}/>
          Resize nodes by:
        </Accordion.Header>
        <Accordion.Body>
        {Centrality}
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
  )
}

export default LeftPanel;
