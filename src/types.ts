import { Color } from "chroma-js";

export interface Node {
  id: string;
  name: string;
  affiliation: string;
  degree: number;
  betweenness: number;
  closeness: number;
  eigenvector: number;
  leiden: string;
  sbm: string;
  topic: string;
  paper_count: number;
  color: string;
};

export interface Edge {
    id: string;
    source: string;
    target: string;
    year: string;
};

export interface Community {
  id: string;
  count: number;
  color: string;
}