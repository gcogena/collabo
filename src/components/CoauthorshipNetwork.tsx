import React, { useEffect } from "react";
import Graph from "graphology";
import circular from "graphology-layout/circular";
import {
  useSigma,
  useRegisterEvents,
  useLoadGraph
} from "react-sigma-v2";
import { Node, Edge, Community } from "../types";
import forceAtlas2 from "graphology-layout-forceatlas2";

interface NetworkParam {
  nodes: Node[];
  edges: Edge[];
  authors: string[];
  centrality: string;
  community: string;
  clickedNode: Node;
  onNodeClick: Function;
  sbm_com: Community[];
  leiden_com: Community[];
  aff_com: Community[];
  setAuthors:Function;
  setAuthorNames:Function;
}

const degree_range = require('../data/range.json').degree_range;
const betweenness_range = require('../data/range.json').betweenness_range;
const closeness_range = require('../data/range.json').closeness_range;
const eigenvector_range = require('../data/range.json').eigenvector_range;

const CustomGraph: React.FC<NetworkParam> = ({ nodes, edges, centrality, community, authors,
  clickedNode, onNodeClick, sbm_com, leiden_com, aff_com, setAuthors, setAuthorNames }) => {

  // degree: min=1, max=300
  // betweenness: min=0, max=999
  // closeness: min=0.07, max=1.0
  // eigenvector: min=0.00026, max=1.0

  const setSize = (cen:number,range:number[]) => {
    var size:number = 0;

    if(cen === 0) {
      size = 1
    } else {
      for(let i=1; i<=range.length; i++){
        if(cen >= range[i-1] && cen < range[i]) {
          size = i+2;
          break;
        }      
      }
    }
    
    return size;
  }

  // hooks
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();

  useEffect(()=>{
    setAuthorNames(authors)
    setAuthors((nodes.sort(function(a, b) { return b.paper_count - a.paper_count })).slice(0,20))
  },[])

  useEffect(() => {
    const graph = new Graph();
    // Create all nodes
    nodes.forEach((node) => {

      graph.addNode(node.id, {
        nodeType: "author",
        label: node.name,
        size: centrality === "Degree Centrality" ? setSize(node.degree, degree_range) : 
              centrality === "Betweenness Centrality" ? setSize(node.betweenness, betweenness_range) : 
              centrality === "Eigenvector Centrality" ? setSize(node.eigenvector, eigenvector_range) :
              setSize(node.closeness, closeness_range),
        degree: node.degree,
        betweenness: node.betweenness,
        closeness: node.closeness,
        eigenvector: node.eigenvector,
        leiden: node.leiden,
        sbm: node.sbm,
        affiliation: node.affiliation,
        topic: node.topic,
        color: community === "Community (Leiden Algorithm)" ? leiden_com[leiden_com.map(function(o) { return o.id; }).indexOf(node.leiden)].color:
               community === "Community (Stochastic Block Model)" ? sbm_com[sbm_com.map(function(o) { return o.id; }).indexOf(node.sbm)].color :
               community === "Affiliation" ? aff_com[aff_com.map(function(o) { return o.id; }).indexOf(node.affiliation)].color :
               node.color
      });
    });

    // Create all edges
    edges.forEach((edge) => {
      graph.addEdge(edge.source, edge.target, {
        type: "line",
        year: edge.year,
        label: "co-authored with"
      });
    });


    circular.assign(graph);
    const settings = forceAtlas2.inferSettings(graph);
    forceAtlas2.assign(graph, { settings, iterations: 100 });
    loadGraph(graph);

  }, [centrality, nodes, community]);

  useEffect(() => {
    registerEvents({
      clickNode: ({ node }) => {
        onNodeClick(nodes[nodes.map(function(x) { return x.id; }).indexOf(node)])
      }
    }) 
  },[clickedNode]);


  return null;
};

export default CustomGraph;
