import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarData } from "../../types"

interface GraphData {
  data: BarData[]
  title: string;
}

const BarGraph: React.FC<GraphData> = ({ data, title }) => {
    return (
    <div className="chart-container bar">
    <h3>{ title }</h3>
      <ResponsiveContainer width="100%" height="95%">
        <BarChart data={data} layout="vertical"
          margin={{
            top: 5,
            right: 20,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number"/>
          <YAxis dataKey="name" type="category"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="midnightblue">
            {data.map((d) => (
                <Cell fill={ d.color } />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
}

export default BarGraph;