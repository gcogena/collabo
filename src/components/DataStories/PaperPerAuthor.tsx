import { useReadCypher } from "use-neo4j"
import  Spinner from 'react-bootstrap/Spinner'
import { toNumber } from "neo4j-driver-core"
import BarGraph from "./BarGraph"
import { BarData, GraphParam } from "../../types"

const PaperPerAuthorGraph: React.FC<GraphParam> = ({title}) => {

    var paper_per_author:BarData[] = []

    const { loading, error, records } = useReadCypher(
        'MATCH (n) RETURN n.auth_name as name, n.aff_color as aff_color, n.aff_name as aff_name, toInteger(n.paper_count) as papers ORDER BY papers DESC LIMIT 10')

    if( loading ) return <Spinner style={{ position: "absolute", top: "45%", left: "45%" }} animation="border"/>
    else if( error ) return <h1>{ error.message }</h1>
    
    records?.map((record)=>{
        paper_per_author.push({name:record.get("name"), count:toNumber(record.get("papers")), color:record.get("aff_color")})
    })

    return(
        <BarGraph data={paper_per_author}  title={ title }/>
    )    
}

export default PaperPerAuthorGraph;