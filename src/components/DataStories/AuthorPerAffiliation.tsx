import { useReadCypher } from "use-neo4j"
import  Spinner from 'react-bootstrap/Spinner'
import { toNumber } from "neo4j-driver-core"
import BarGraph from "./BarGraph"
import { BarData, GraphParam } from "../../types"

const AuthorPerAffiliation: React.FC<GraphParam> = ({title}) => {

    var auth_per_aff:BarData[] = []

    const { loading, error, records } = useReadCypher(
        'MATCH (n) RETURN n.aff_id as id, n.aff_name as name, n.aff_color as color,  COUNT(n) as affcount ORDER BY affcount DESC SKIP 1 LIMIT 10')

    if( loading ) return <Spinner style={{ position: "absolute", top: "45%", left: "45%" }} animation="border"/>
    else if( error ) return <h1>{ error.message }</h1>
    
    records?.map((record)=>{
        auth_per_aff.push({name:record.get("name") !== null ? record.get("name") : record.get("id"), count:toNumber(record.get("affcount")), color: record.get("color")})
    })

    return(
        <BarGraph data={auth_per_aff}  title={ title } />
    )    
}

export default AuthorPerAffiliation;