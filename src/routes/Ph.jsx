import BarNav from "../components/BarNav";
import { useEffect, useState } from "react";
import socket from '../libs/socket';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PhData = () => {
  const [phData, setPhData] = useState([]);
  const [ph, setPh] = useState(null);

  useEffect(() => {
    socket.on('ph-data', (newPhData) => {
      const timestamp = Date.now();
      setPh(newPhData.value);
      setPhData((prevData) => [...prevData, { ...newPhData, timestamp }]);
    });

    return () => {
      socket.off('ph-data');
    };
  }, []);

  return (
    <div className="ph_container container container_sensor">
      <BarNav />

      <div className="container_data_sensor">
        <h2 className="subtitle">Nivel de Ph <span className="text-bold">{ph}</span></h2>

        <ResponsiveContainer width="100%" height="70%">
          <LineChart
            data={phData}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{fill: "#ffffff"}} tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} />
            <YAxis tick={{fill: "#ffffff"}} />
            <Tooltip
              labelFormatter={(label) => `Hora: ${new Date(label).toLocaleTimeString()}`}
            />
            <Legend />
            <Line type="monotone" dataKey="value" name="Nivel de ph" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PhData;
