
export interface AuthorNode {
  id: string;
  name: string;
  affiliation: string;
  degree: number;
  betweenness: number;
  closeness: number;
  eigenvector: number;
  leiden: Community;
  sbm: Community;
  paper_count: number;
  color: string;
  affiliation_color: string;
  degree_size: number;
  betweenness_size: number;
  closeness_size: number;
  eigenvector_size: number;
};

export interface AuthorTopicNode {
  id: string;
  name: string;
  affiliation: string;
  topic: Topic;
}

export interface Topic {
  id: string;
  gamma: number;
  terms: string;
  color: string;
  count: number;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    year: string;
    weight: number;
};

export interface Community {
  id: string;
  color: string;
}

export interface CommunityCount {
  id: string;
  count: number;
  color: string;
}

export interface GraphParam {
  title: string;
}

export interface LineData {
  year: string;
  count: number;
}

export interface BarData {
  name: string;
  count: number;
  color: string;
}