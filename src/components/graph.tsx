import React, { useEffect } from "react";

import { Node, Edge, Community } from "../types";
import CoauthorshipNetwork from "./CoauthorshipNetwork";
import  Spinner from 'react-bootstrap/Spinner'

import "react-sigma-v2/lib/react-sigma-v2.css";
import { useReadCypher } from "use-neo4j"

//import colors from "../data/colors.json"

interface GraphParams{
  getAuthors: Function;
  getRank: Function;
  year: string;
  centrality: string;
  community: string;
  clickedNode: Node;
  onNodeClick: Function;
  query: string;
  getAuthorNames: Function;
}

const colors = require ('../data/colors.json').colors;

const Graph: React.FC<GraphParams> = ({ year, centrality, community, clickedNode, onNodeClick, 
  query, getRank, getAuthors, getAuthorNames}) => {

  const getCommunity = (str:string) => {
    var clean_str = str.replace(/['"{}]+/g,"");
    var arr = clean_str.split(", ");

    var communities:any = {}
    for(let index in arr){
      var pair = arr[index].split(": ");
      communities[pair[0]] = pair[1];
    }
  
    return communities
  }

  const getCommunityCount = (com_id:string, arr:Community[]) => {
    var index = arr.map(function(o) { return o.id; }).indexOf(com_id);

    if(index === -1) {
      arr.push({id: com_id, count: 1, color:colors[arr.length].hex});
    } else {
      arr[index].count += 1;
    }
  }

  var nodes:Node[] = [];
  var edges:Edge[] = [];
  var authors:string[] =[];
  var sbm_com:Community[] = [];
  var leiden_com:Community[] = [];
  var aff_com:Community[] = [];

  useEffect(()=>{
    if (community === "Affiliation") getRank((aff_com.sort(function(a, b) { return b.count - a.count })).slice(0,20))
    else if (community === "Community (Leiden Algorithm)") getRank((leiden_com.sort(function(a, b) { return b.count - a.count })).slice(0,20))
    else if (community === "Community (Stochastic Block Model)") getRank((sbm_com.sort(function(a, b) { return b.count - a.count })).slice(0,20))  
    else getAuthors((nodes.sort(function(a, b) { return b.paper_count - a.paper_count })).slice(0,20))  
  },[community])

  const { loading, error, records } = useReadCypher(
  'MATCH (a1:Author)-[r:COAUTHORED_WITH]->(a2:Author) RETURN \
      \
      ID(a1) as a1_id, a1.auth_name as a1_name, a1.auth_affname as a1_aff, a1.auth_afid as a1_affid, \
      a1.degree_centrality as a1_degree, a1.betweenness_centrality as a1_betweenness, \
      a1.closeness_centrality as a1_closeness, a1.eigenvector_centrality as a1_eigenvector, \
      a1.leiden_community as a1_leiden, a1.sbm_community as a1_sbm, \
      a1.topic_community as a1_topic, a1.auth_papers as a1_count, \
      \
      ID(a2) as a2_id, a2.auth_name as a2_name, a2.auth_affname as a2_aff, a2.auth_afid as a2_affid, \
      a2.degree_centrality as a2_degree, a2.betweenness_centrality as a2_betweenness, \
      a2.closeness_centrality as a2_closeness, a2.eigenvector_centrality as a2_eigenvector, \
      a2.leiden_community as a2_leiden, a2.sbm_community as a2_sbm, \
      a2.topic_community as a2_topic, a2.auth_papers as a2_count, \
      \
      ID(r) as r_id, r.year as r_year, r.weight as r_weight \
      LIMIT 10000 \
    ')

  if( loading ) return <Spinner style={{ position: "absolute", top: "45%", left: "45%" }} animation="border"/>
  else if( error ) return <h1>{ error.message }</h1>

    records?.map((record)=>{
    var source = "n"+record.get('a1_id').toString();
    var target = "n"+record.get('a2_id').toString();

      if(query==="" || (query !== "" && (query === record.get('a1_name') || query === record.get('a2_name')))) {  
        if(nodes.map(function(x) { return x.id; }).indexOf(source) === -1) {
            authors.push(record.get('a1_name'));
            nodes.push({id:source, name: record.get('a1_name'), 
                        affiliation: record.get('a1_aff') === null ? record.get('a1_affid') : record.get('a1_aff'), 
                        degree: record.get('a1_degree'), betweenness: record.get('a1_betweenness'),
                        closeness: record.get('a2_closeness'),eigenvector: record.get('a1_eigenvector'), 
                        leiden: getCommunity(record.get('a1_leiden'))[year],
                        sbm: getCommunity(record.get('a1_sbm'))[year], topic: record.get('a1_topic'), 
                        paper_count: record.get('a1_count'), 
                        color: colors[nodes.length > 1302 ? nodes.length % 1302 : nodes.length].hex
            }); 
            getCommunityCount(nodes[nodes.length-1].sbm, sbm_com);
            getCommunityCount(nodes[nodes.length-1].leiden, leiden_com);
            getCommunityCount(nodes[nodes.length-1].affiliation, aff_com);

        } 

        if(nodes.map(function(x) { return x.id; }).indexOf(target) === -1) {
            authors.push(record.get('a2_name'));
            nodes.push({id:target, name: record.get('a2_name'), 
                        affiliation: record.get('a2_aff') === null ? record.get('a2_affid') : record.get('a2_aff'),
                        degree: record.get('a2_degree'), betweenness: record.get('a2_betweenness'), 
                        closeness: record.get('a2_closeness'), eigenvector: record.get('a2_eigenvector'), 
                        leiden: getCommunity(record.get('a2_leiden'))[year],
                        sbm: getCommunity(record.get('a2_sbm'))[year], topic: record.get('a2_topic'), 
                        paper_count: record.get('a2_count'), 
                        color: colors[nodes.length > 1302 ? nodes.length % 1302 : nodes.length].hex
            });

            getCommunityCount(nodes[nodes.length-1].sbm, sbm_com);
            getCommunityCount(nodes[nodes.length-1].leiden, leiden_com);
            getCommunityCount(nodes[nodes.length-1].affiliation, aff_com);

        }  
      
        if(record.get("r_year")===year){
          edges.push({id:"e"+record.get('r_id').toString(), source: source, target: target, year: record.get('r_year')})
        }
      }    
  });

  return (

      <CoauthorshipNetwork 
        nodes={ nodes } edges={ edges } 
        centrality={ centrality } community={ community } authors= { authors }
        clickedNode={ clickedNode } onNodeClick={ onNodeClick }
        sbm_com={ sbm_com } leiden_com={ leiden_com } aff_com={ aff_com } 
        setAuthors={ getAuthors } setAuthorNames={ getAuthorNames }/>

  );
};

export default Graph;
