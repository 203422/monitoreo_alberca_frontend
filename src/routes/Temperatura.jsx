import BarNav from "../components/BarNav";
import { useEffect, useState } from "react";
import socket from '../libs/socket';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Temperatura = () => {

    const [tempData, setTempData] = useState([]);
    const [temperatura, setTemperatura] = useState(null);

    useEffect(() => {
        socket.on('temperatura-data', (newTempData) => {
            const timestamp = Date.now();
            setTemperatura(newTempData.value);
            setTempData((prevData) => [...prevData, { ...newTempData, timestamp }]);
        });

        return () => {
            socket.off('temperatura-data');
        };
    }, []);


    return (

        <div className="temperature_container container container_sensor">
            <BarNav />


            <div className="container_data_sensor">
                <h2 className="subtitle">Temperatura <span className="text-bold">{`${temperatura} °C`}</span></h2>

                <ResponsiveContainer width="100%" height="70%">
                    <LineChart
                        data={tempData}
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
                        <Line type="monotone" dataKey="value" name="Temperatura °C" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>

            </div>


        </div>


    );
}

export default Temperatura;