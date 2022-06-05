import React, { useEffect } from "react";
import Graph from "graphology";
import circular from "graphology-layout/circular";
import {
  useSigma,
  useRegisterEvents,
  useLoadGraph
} from "react-sigma-v2";
// import Sigma from "sigma";
// import { Coordinates } from "sigma/types";
import { AuthorNode, Edge, CommunityCount } from "../../types";
import forceAtlas2 from "graphology-layout-forceatlas2";

interface CNParam {
  query: string;
  nodes: AuthorNode[];
  edges: Edge[];
  authors: string[];
  centrality: string;
  community: string;
  leiden: CommunityCount[];
  sbm: CommunityCount[];
  aff: CommunityCount[];
  clickedNode: AuthorNode;
  onNodeClick: Function;
  setAuthors:Function;
  setComRank: Function;
  setAuthorNames:Function;
}

const CoauthorshipNetwork: React.FC<CNParam> = ({ query, nodes, edges, centrality, community,leiden, sbm, aff, authors,
  clickedNode, onNodeClick, setAuthors, setAuthorNames, setComRank }) => {

  // hooks
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();

  const graph = new Graph();
  // const container = document.getElementById(id) as HTMLElement;
  // const renderer = new Sigma(graph, container)

  useEffect(()=>{
    setAuthorNames(authors)
    community === "Author" ? setAuthors((nodes.sort(function(a, b) { return b.paper_count - a.paper_count })).slice(0,20)) :
    community === "Affiliation" ? setComRank((aff.sort(function(a, b) { return b.count - a.count })).slice(0,20)) : 
    community === "Community (Leiden Algorithm)" ? setComRank((leiden.sort(function(a, b) { return b.count - a.count })).slice(0,20)) :
    setComRank((sbm.sort(function(a, b) { return b.count - a.count })).slice(0,20))
  },[community])

  useEffect(() => {
    // Create all nodes
    nodes.forEach((node) => {

      graph.addNode(node.id, {
        nodeType: "author",
        label: node.name,
        size: centrality === "Degree Centrality" ? node.degree_size :
              centrality === "Betweenness Centrality" ?  node.betweenness_size:
              centrality === "Closeness Centrality" ? node.closeness_size :
              node.eigenvector_size,
        degree: node.degree,
        betweenness: node.betweenness,
        closeness: node.closeness,
        eigenvector: node.eigenvector,
        leiden: node.leiden,
        sbm: node.sbm,
        affiliation: node.affiliation,
        color: community === "Community (Leiden Algorithm)" ? node.leiden["color"] :
               community === "Community (Stochastic Block Model)" ? node.sbm["color"] :
               community === "Affiliation" ? node.affiliation_color : 
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

  }, [nodes, query]);

  useEffect(() => {
    registerEvents({
      clickNode: ({ node }) => {
        var selectedNode = nodes[nodes.map(function(x) { return x.id; }).indexOf(node)];
        onNodeClick(selectedNode)
        // const nodePosition = renderer.getNodeDisplayData(selectedNode) as Coordinates;
        // renderer.getCamera().animate(nodePosition, {
        //   duration: 500,
        // });
      }
    }) 
  },[clickedNode]);


  return null;
};

export default CoauthorshipNetwork;
