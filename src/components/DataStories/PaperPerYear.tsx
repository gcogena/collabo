import { useReadCypher } from "use-neo4j"
import  Spinner from 'react-bootstrap/Spinner'
import { toNumber } from "neo4j-driver-core"
import LineGraph from "./LineGraph"
import { LineData, GraphParam } from "../../types"

const PaperPerYearGraph: React.FC<GraphParam> = ({title}) => {

    var paper_per_year:LineData[] = []

    const { loading, error, records } = useReadCypher(
        'MATCH (n)-[r]->(m) RETURN DISTINCT(r.year) as year, SUM(toInteger(r.weight)) as weight ORDER BY year LIMIT 61')

    if( loading ) return <Spinner style={{ position: "relative", top: "50%", left: "50%" }} animation="border"/>
    else if( error ) return <h1>{ error.message }</h1>
    
    records?.map((record)=>{
        paper_per_year.push({year:record.get("year"), count:toNumber(record.get("weight"))})
    })

    return(
        <LineGraph data={paper_per_year} title={ title }/>
    )    
}

export default PaperPerYearGraph;