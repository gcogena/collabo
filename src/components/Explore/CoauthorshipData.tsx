import React, { useEffect } from "react";

import { AuthorNode, Edge, CommunityCount } from "../../types";
import CoauthorshipNetwork from "./CoauthorshipNetwork";
import  Spinner from 'react-bootstrap/Spinner'

import "react-sigma-v2/lib/react-sigma-v2.css";
import { useReadCypher } from "use-neo4j" 

interface CoauthorshipParams{
  getAuthors: Function;
  getRank: Function;
  year: string;
  limit: string;
  centrality: string;
  community: string;
  clickedNode: AuthorNode;
  onNodeClick: Function;
  query: string;
  getAuthorNames: Function;
}

const CoauthorshipData: React.FC<CoauthorshipParams> = ({ year, limit, centrality, community, clickedNode, onNodeClick, 
  query, getRank, getAuthors, getAuthorNames}) => {

  const getCommunityCount = (com_id:string, com_color: string, arr:CommunityCount[]) => {
    var index = arr.map(function(o) { return o.id; }).indexOf(com_id);

    if(index === -1) {
      arr.push({id: com_id, count: 1, color: com_color});
    } else {
      arr[index].count += 1;
    }
  }

  var nodes:AuthorNode[] = [];
  var edges:Edge[] = [];
  var authors:string[] =[];
  var sbm_com:CommunityCount[] = [];
  var leiden_com:CommunityCount[] = [];
  var aff_com:CommunityCount[] = [];

  var db_query:string =
    "MATCH (a1:AUTHOR)-[r:COAUTHORED_WITH {year: $year}]->(a2:AUTHOR) RETURN \
      \
      ID(a1) as a1_id, a1.auth_name as a1_name, a1.auth_color as a1_color,   \
      a1.aff_name as a1_aff, a1.aff_id as a1_affid, a1.aff_color as a1_affcolor,\
      a1.degree as a1_degree, a1.degree_size as a1_degreeSize, \
      a1.betweenness as a1_betweenness, a1.betweenness_size as a1_betweennessSize, \
      a1.closeness as a1_closeness, a1.closeness_size as a1_closenessSize, \
      a1.eigenvector as a1_eigenvector, a1.eigenvector_size as a1_eigenvectorSize, \
      a1.leiden as a1_leiden, a1.sbm as a1_sbm, \
      a1.paper_count as a1_count,\
      \
      ID(a2) as a2_id, a2.auth_name as a2_name, a2.auth_color as a2_color, \
      a2.aff_name as a2_aff, a2.aff_color as a2_affcolor, a2.aff_id as a2_affid, \
      a2.degree as a2_degree, a2.degree_size as a2_degreeSize, \
      a2.betweenness as a2_betweenness, a2.betweenness_size as a2_betweennessSize, \
      a2.closeness as a2_closeness, a2.closeness_size as a2_closenessSize, \
      a2.eigenvector as a2_eigenvector, a2.eigenvector_size as a2_eigenvectorSize, \
      a2.leiden as a2_leiden, a2.sbm as a2_sbm, \
      a2.paper_count as a2_count, \
      \
      ID(r) as r_id, r.year as r_year, r.weight as r_weight\
      \
      LIMIT toInteger($limit) \
    "
 
  const { loading, error, records, run} = useReadCypher(db_query, { year, limit })

  useEffect(() => {
    run({ year, limit })
  }, [ year, limit ])

  if( loading ) return <Spinner style={{ position: "absolute", top: "45%", left: "45%" }} animation="border"/>
  else if( error ) return <h1>{ error.message }</h1>

  records?.map((record)=>{
    var source = "n"+record.get('a1_id').toString();
    var target = "n"+record.get('a2_id').toString();
    var edge = "e"+record.get('r_id').toString();

    if(query==="" || (query !== "" && (query === record.get('a1_name') || query === record.get('a2_name')))) {  
      if(nodes.map(function(x) { return x.id; }).indexOf(source) === -1) {
          authors.push(record.get('a1_name'));
          nodes.push({id:source, name: record.get('a1_name'),
                      affiliation: record.get('a1_aff') === null ? record.get('a1_affid') : record.get('a1_aff'), 
                      degree: JSON.parse(record.get('a1_degree'))[year],  
                      betweenness:  JSON.parse(record.get('a1_betweenness'))[year], 
                      closeness:  JSON.parse(record.get('a1_closeness'))[year], 
                      eigenvector:  JSON.parse(record.get('a1_eigenvector'))[year], 
                      degree_size: JSON.parse(record.get('a1_degreeSize'))[year]*2,
                      betweenness_size: JSON.parse(record.get('a1_betweennessSize'))[year]*2,
                      closeness_size: JSON.parse(record.get('a1_closenessSize'))[year]/2,
                      eigenvector_size: JSON.parse(record.get('a1_eigenvectorSize'))[year]*2,
                      // size: centrality === "Degree Centrality" ? JSON.parse(record.get('a1_degreeSize'))[year]*2 : 
                      //       centrality === "Betweenness Centrality" ? JSON.parse(record.get('a1_betweennessSize'))[year]*2 :
                      //       centrality === "Closeness Centrality" ? JSON.parse(record.get('a1_closenessSize'))[year]*2 :
                      //       JSON.parse(record.get('a1_eigenvectorSize'))[year]*2 ,
                      leiden: JSON.parse(record.get('a1_leiden')).hasOwnProperty(year) ? JSON.parse(record.get('a1_leiden'))[year] :  "None",
                      sbm: JSON.parse(record.get('a1_sbm')).hasOwnProperty(year) ? JSON.parse(record.get('a1_sbm'))[year] :  "None",
                      paper_count: record.get('a1_count'),
                      // color: community === "Community (Leiden Algorithm)" ? (JSON.parse(record.get('a1_leiden')).hasOwnProperty(year) ? 
                      //           JSON.parse(record.get('a1_leiden'))[year]["color"] :  "black") :
                      //        community === "Community (Stochastic Block Model)" ? (JSON.parse(record.get('a1_sbm')).hasOwnProperty(year) ? 
                      //        JSON.parse(record.get('a1_leiden'))[year]["color"] : "black"):
                      //        community === "Affiliation" ? record.get('a1_affcolor') :
                      //        record.get('a1_color')
                      color: record.get('a1_color'),
                      affiliation_color: record.get('a1_affcolor')
          }); 
          getCommunityCount(nodes[nodes.length-1].sbm["id"], nodes[nodes.length-1].sbm["color"], sbm_com);
          getCommunityCount(nodes[nodes.length-1].leiden["id"], nodes[nodes.length-1].leiden["color"], leiden_com);
          getCommunityCount(nodes[nodes.length-1].affiliation, record.get('a1_affcolor'), aff_com);

      } 

      if(nodes.map(function(x) { return x.id; }).indexOf(target) === -1) {
          authors.push(record.get('a2_name'));
          nodes.push({id:target, name: record.get('a2_name'),
                      affiliation: record.get('a2_aff') === null ? record.get('a2_affid') : record.get('a2_aff'),
                      degree: JSON.parse(record.get('a2_degree'))[year],
                      betweenness:  JSON.parse(record.get('a2_betweenness'))[year], 
                      closeness:  JSON.parse(record.get('a2_closeness'))[year],
                      eigenvector:  JSON.parse(record.get('a2_eigenvector'))[year],
                      degree_size: JSON.parse(record.get('a2_degreeSize'))[year]*2,
                      betweenness_size: JSON.parse(record.get('a2_betweennessSize'))[year]*2,
                      closeness_size: JSON.parse(record.get('a2_closenessSize'))[year]/2,
                      eigenvector_size: JSON.parse(record.get('a2_eigenvectorSize'))[year]*2,
                      // size: centrality === "Degree Centrality" ? JSON.parse(record.get('a2_degreeSize'))[year]*2 : 
                      //       centrality === "Betweenness Centrality" ? JSON.parse(record.get('a2_betweennessSize'))[year]*2 :
                      //       centrality === "Closeness Centrality" ? JSON.parse(record.get('a2_closenessSize'))[year]*2 :
                      //       JSON.parse(record.get('a2_eigenvectorSize'))[year]*2,
                      leiden: JSON.parse(record.get('a2_leiden')).hasOwnProperty(year) ? JSON.parse(record.get('a2_leiden'))[year] : {id:"none", color:"black"},
                      sbm: JSON.parse(record.get('a2_sbm')).hasOwnProperty(year) ? JSON.parse(record.get('a2_sbm'))[year] : {id:"none", color:"black"},
                      paper_count: record.get('a2_count'),
                      // color: community === "Community (Leiden Algorithm)" ? (JSON.parse(record.get('a2_leiden')).hasOwnProperty(year) ? 
                      //           JSON.parse(record.get('a2_leiden'))[year]["color"] : "black") :
                      //        community === "Community (Stochastic Block Model)" ? (JSON.parse(record.get('a2_sbm')).hasOwnProperty(year) ? 
                      //        JSON.parse(record.get('a2_leiden'))[year]["color"] :  "black"):
                      //        community === "Affiliation" ? record.get('a2_affcolor') :
                      //        record.get('a2_color')
                      color: record.get('a2_color'),
                      affiliation_color: record.get('a2_affcolor')
          });

          getCommunityCount(nodes[nodes.length-1].sbm["id"], nodes[nodes.length-1].sbm["color"], sbm_com);
          getCommunityCount(nodes[nodes.length-1].leiden["id"], nodes[nodes.length-1].leiden["color"], leiden_com);
          getCommunityCount(nodes[nodes.length-1].affiliation, record.get('a2_affcolor'), aff_com);
      }  
      
      edges.push({id:edge, source: source, target: target, year: record.get('r_year')})
    }
   
  });
  
  return (
      <CoauthorshipNetwork 
        nodes={ nodes } edges={ edges } query={ query }
        centrality={ centrality } community={ community } authors= { authors }
        leiden={ leiden_com } sbm={ sbm_com } aff={ aff_com }
        clickedNode={ clickedNode } onNodeClick={ onNodeClick } setComRank={ getRank }
        setAuthors={ getAuthors } setAuthorNames={ getAuthorNames }/>
  );
};

export default CoauthorshipData;
