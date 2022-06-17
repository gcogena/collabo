import React, { useEffect } from "react";
import Graph from "graphology";
import circular from "graphology-layout/circular";
import {
  useSigma,
  useRegisterEvents,
  useLoadGraph
} from "react-sigma-v2";
import forceAtlas2 from "graphology-layout-forceatlas2";
import chroma from "chroma-js";

import { AuthorTopicNode, Edge } from '../../types'


interface TNParam {
    query:string;
    nodes: AuthorTopicNode[];
    edges: Edge[];
    authors: string[]; 
    clickedNode: AuthorTopicNode; 
    onNodeClick: Function;
    setAuthorNames:Function;
}

const TopicNetwork: React.FC<TNParam> = ({ query, nodes, edges, authors, setAuthorNames, clickedNode, onNodeClick }) => {

    const sigma = useSigma();
    const registerEvents = useRegisterEvents();
    const loadGraph = useLoadGraph();

    const graph = new Graph();

    useEffect(()=>{
      setAuthorNames(authors)
    },[query]) 

    useEffect(() => {
    
        // Create all nodes
        nodes.forEach((node) => {
          graph.addNode(node.id, {
            nodeType: "author",
            label: node.name,
            size: 5,   
            topic: node.topic,
            color: chroma.scale(['#fff',node.topic.color])(node.topic.gamma*5).hex()
          })
        })
    
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
    
      }, [nodes, query]);

    useEffect(() => {
      registerEvents({
        clickNode: ({ node }) => {
          console.log(node)
          onNodeClick(nodes[nodes.map(function(x) { return x.id; }).indexOf(node)])
        }
      }) 
    },[clickedNode]);
      
  return null;
}

export default TopicNetwork;