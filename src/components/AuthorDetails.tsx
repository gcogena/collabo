import { Node } from "../types";

interface NodeData {
  data: Node;
}

const AuthorDetails: React.FC<NodeData> = ({ data }) => {
  return (
         data.id==="" ? <h3>Click node to view its details</h3> :
          <>
            <span style={{ fontSize: "14pt", fontWeight:"bold"}}>{ data.name }</span>
            <br/>
            <span className="mb-2 text-muted">{ data.affiliation }</span>
            <br/>
            <br/>
            <ul>
              <li>Paper count: { data.paper_count }</li>
              <li>Degree centrality: { data.degree }</li>
              <li>Betweenness centrality: { data.betweenness }</li>
              <li>Closeness centrality: { data.closeness }</li>
              <li>Eigenvector centrality: { data.eigenvector }</li>
              <li>Leiden community ID: { data.leiden }</li>
              <li>SBM community ID: { data.sbm  }</li>
            </ul>
            </>
  )
}

export default AuthorDetails