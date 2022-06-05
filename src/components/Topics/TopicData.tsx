import React, { useEffect } from 'react'
import { AuthorTopicNode, Edge, Topic } from '../../types';
import { useReadCypher } from 'use-neo4j'
import TopicNetwork from "./TopicNetwork"
import  Spinner from 'react-bootstrap/Spinner'


interface TopicDataParams {
    year: string;
    limit: string;
    topic: string;
    specificTopic: string;
    clickedNode: AuthorTopicNode;
    onNodeClick: Function;
    query: string;
    getAuthorNames: Function;
    topTopics: Topic[];
    topicsPerYear: Topic[];
}

const TopicData: React.FC<TopicDataParams> = ({year, limit, topic, specificTopic, clickedNode, onNodeClick, query, getAuthorNames, topTopics, topicsPerYear}) => {

  var nodes:AuthorTopicNode[] = []
  var edges:Edge[] = []
  var authors:string[] = []

  const getIndex = (topic_id:string,arr:Topic[]) => {
    return arr.map(function(o) { return o.id; }).indexOf(topic_id);
  }

  const getTopicDetails = (node_topics:any) => {
    for(var i=1; i<=10; i++) {
      if (node_topics[i.toString()]["topicID"] == specificTopic) {
        return {"id":i.toString(), 
          "gamma":node_topics[i.toString()]["gamma"], 
          "terms":node_topics[i.toString()]["terms"],
          "color":topicsPerYear[topicsPerYear.findIndex(x => x.id.toString() == specificTopic)]["color"],
          "count":topicsPerYear[topicsPerYear.findIndex(x => x.id.toString() == specificTopic)]["count"]
        } 
      }
    }
    return {"id":"None", "gamma":1, "terms":"", "color":"#000000", "count":0}
  }

  var db_query:string =
    "MATCH (a1:AUTHOR)-[r:COAUTHORED_WITH {year: $year}]->(a2:AUTHOR) RETURN \
    \
    ID(a1) as a1_id, a1.auth_name as a1_name, a1.aff_id as a1_affid,   \
    a1.aff_name as a1_affname, a1.topics as a1_topics, \
    \
    ID(a2) as a2_id, a2.auth_name as a2_name, a2.aff_id as a2_affid,   \
    a2.aff_name as a2_affname, a2.topics as a2_topics, \
    \
    ID(r) as r_id, r.year as r_year, r.weight as r_weight\
    \
    LIMIT toInteger($limit)";
  
  const { loading, error, records, run} = useReadCypher(db_query, { year, limit })

  useEffect(() => {
    run({ year, limit })
  }, [ year, limit, specificTopic ])

  if( loading ) return <Spinner style={{ position: "absolute", top: "45%", left: "45%" }} animation="border"/>
  else if( error ) return <h1>{ error.message }</h1>

  records?.map((record)=>{
    var source = "n"+record.get('a1_id').toString();
    var target = "n"+record.get('a2_id').toString();
    var edge = "e"+record.get('r_id').toString();

    if(query==="" || (query !== "" && (query === record.get('a1_name') || query === record.get('a2_name')))) {  
      if(nodes.map(function(x) { return x.id; }).indexOf(source) === -1) {
        authors.push(record.get("a1_name"))
        nodes.push({id: source, name: record.get("a1_name"), 
                    affiliation: record.get('a1_affname') === null ? record.get('a1_affid') : record.get('a1_affname'),
                    topic:  
                      JSON.parse(record.get('a1_topics')) && JSON.parse(record.get('a1_topics')).hasOwnProperty(year) ?
                        specificTopic !== '' ?
                          getTopicDetails(JSON.parse(record.get("a1_topics"))[year]) :
                        {"id":JSON.parse(record.get("a1_topics"))[year]["1"]["topicID"], 
                          "gamma":JSON.parse(record.get("a1_topics"))[year]["1"]["gamma"], 
                          "terms":JSON.parse(record.get("a1_topics"))[year]["1"]["terms"],
                          "color":topTopics[getIndex(JSON.parse(record.get("a1_topics"))[year]["1"]["topicID"], topTopics)]["color"],
                          "count":topTopics[getIndex(JSON.parse(record.get("a1_topics"))[year]["1"]["topicID"], topTopics)]["count"]
                        } : 
                      {"id":"None", "gamma":1, "terms":"", "color":"#000000", "count":0}
                  })
      }

      if(nodes.map(function(x) { return x.id; }).indexOf(target) === -1) {
        authors.push(record.get('a2_name'));
        nodes.push({id:target, name: record.get('a2_name'),
                    affiliation: record.get('a2_affname') === null ? record.get('a2_affid') : record.get('a2_affname'),
                    topic: 
                      JSON.parse(record.get('a2_topics')) && JSON.parse(record.get('a2_topics')).hasOwnProperty(year) ?
                        specificTopic !== '' ?
                          getTopicDetails(JSON.parse(record.get("a2_topics"))[year]) :
                        {"id":JSON.parse(record.get("a2_topics"))[year]["1"]["topicID"], 
                          "gamma":JSON.parse(record.get("a2_topics"))[year]["1"]["gamma"], 
                          "terms":JSON.parse(record.get("a2_topics"))[year]["1"]["terms"],
                          "color":topTopics[getIndex(JSON.parse(record.get("a2_topics"))[year]["1"]["topicID"], topTopics)]["color"],
                          "count":topTopics[getIndex(JSON.parse(record.get("a2_topics"))[year]["1"]["topicID"], topTopics)]["count"]
                        } : 
                      {"id":"None", "gamma":1, "terms":"", "color":"#000000", "count":0}
                  })
      }

      edges.push({id:edge, source: source, target: target, year: record.get('r_year')})
    }

  })

  return (
    <TopicNetwork query={query} nodes={nodes} edges={edges} authors={authors} 
      topic={ topic } setAuthorNames={getAuthorNames}
      clickedNode={clickedNode} onNodeClick={onNodeClick} />
  )
}

export default TopicData;