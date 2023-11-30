import BarNav from "../components/BarNav";
import { useEffect, useState } from "react";
import socket from '../libs/socket';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Agua = () => {

    const [aguaData, setAguaData] = useState([]);
    const [agua, setAgua] = useState(null);

    useEffect(() => {
        socket.on('agua-data', (newAguaData) => {
            const timestamp = Date.now();
            setAgua(newAguaData.value);
            setAguaData((prevData) => [...prevData, { ...newAguaData, timestamp }]);
        });

        return () => {
            socket.off('agua-data');
        };
    }, []);


    return (

        <div className="water_container container container_sensor">
            <BarNav />



            <div className="container_data_sensor">
                <h2 className="subtitle">Nivel del Agua <span className="text-bold">{`${agua} Cm`}</span></h2>

                <ResponsiveContainer width="100%" height="70%">
                    <LineChart
                        data={aguaData}
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
                        <Line type="monotone" dataKey="value" name="Nivel del agua" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>


            </div>


        </div>


    );
}

export default Agua;