import BarNav from "../components/BarNav";
import { useEffect, useState } from "react";
import socket from '../libs/socket';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Clima = () => {

    const [climaData, setClimaData] = useState([]);
    const [lluvia, setLLuvia] = useState(null);

    useEffect(() => {
        socket.on('lluvia-data', (newClimaData) => {
            const timestamp = Date.now();
            setLLuvia(newClimaData.value);
            setClimaData((prevData) => [...prevData, { ...newClimaData, timestamp }]);
        });

        return () => {
            socket.off('lluvia-data');
        };
    }, []);

    let weather_state;

    if (lluvia >= 301 && lluvia <= 700) {
        weather_state = "LLuvia ligera"
    } else if (lluvia > 0 && lluvia <= 300) {
        weather_state = "LLuvia intensa"
    } else {
        weather_state = "El cielo está despejado"
    }

    return (

        <div className="weather_container container container_sensor">
            <BarNav />


            <div className="container_data_sensor">
                <h2 className="subtitle">Sensor de lluvia <span className="text-bold">{`${lluvia}`}</span></h2>
                <h2 className="p_block">{weather_state}</h2>
                <ResponsiveContainer width="100%" height="70%">
                    <LineChart
                        data={climaData}
                        margin={{
                            top: 5,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" tick={{ fill: "#ffffff" }} tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} />
                        <YAxis tick={{ fill: "#ffffff" }} />
                        <Tooltip
                            labelFormatter={(label) => `Hora: ${new Date(label).toLocaleTimeString()}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="value" name="LLuvia" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>


        </div>


    );
}

export default Clima;