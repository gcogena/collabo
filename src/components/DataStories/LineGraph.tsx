import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../../styles/graph.css"
import { LineData } from "../../types"

interface GraphData {
  data: LineData[];
  title: string;
}

const LineGraph: React.FC<GraphData> = ({ data, title }) => {
  return (
    <div className="chart-container line">
    <h3>{ title }</h3>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart className="line-chart" data={data}  
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="midnightblue" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}

export default LineGraph
