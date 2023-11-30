import BarNav from "../components/BarNav";
import Card from "../components/Card";
import '../assets/styles/dashboard.css';
import socket from '../libs/socket';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sun from '../assets/img/sun.svg';
import rain from '../assets/img/rain.svg';
import rain_light from '../assets/img/rain_ligth.svg';

const Dashboard = () => {

    const [phData, setPhData] = useState(null);
    const [aguaData, setAguaData] = useState(null);
    const [tempData, setTempData] = useState(null);
    const [lluviaData, setLluviaData] = useState(null);

    useEffect(() => {
        socket.on('ph-data', phData => {
            setPhData(phData.value);
        });

        socket.on('agua-data', aguaData => {
            setAguaData(aguaData.value);
        });

        socket.on('temperatura-data', tempData => {
            setTempData(tempData.value);
        });

        socket.on('lluvia-data', lluviaData => {
            setLluviaData(lluviaData.value);
        });

        return () => {
            socket.off('ph-data');
            socket.off('agua-data');
            socket.off('temperatura-data');
            socket.off('lluvia-data');
        };
    }, []);

    let weatherImg;
    let weather_state;


    if (lluviaData >= 301 && lluviaData <= 700) {
        weatherImg = rain_light;
        weather_state = "LLuvia ligera"
    } else if (lluviaData > 0 && lluviaData <= 300) {
        weatherImg = rain;
        weather_state = "LLuvia intensa"
    } else {
        weatherImg = sun;
        weather_state = "El cielo está despejado"
    }



    return (

        <div className="container container_dashboard">

            <BarNav />

            <div className="container_data">

                <div className="text_container_dashboard">
                    <h2 className="subtitle"> Bienvenido de nuevo</h2>
                </div>

                <Link to="/ph" className="card-link">
                    <Card
                        title='Nivel de pH'
                        text='El nivel adecuado de pH suele estar en el rango de 6 a 7'
                        data={phData}
                        typeOfCard="large"
                    />
                </Link>

                <Link to="/agua" className="card-link">
                    <Card
                        title='Nivel de Agua'
                        // text={aguaMensaje}
                        data={`${aguaData} cm`}
                        typeOfCard='short'
                    />
                </Link>

                <Link to="/temperatura" className="card-link">
                    <Card
                        title='Temperatura del Agua'
                        text='La temperatura es ideal para nadar'
                        data={tempData}
                        typeOfCard='short'
                    />
                </Link>

                <Link to="/clima" className="card-link">
                    <Card
                        title='Sensor de lluvia'
                        data={lluviaData}
                        img={weatherImg}
                        text={weather_state}
                        typeOfCard='large'
                        title_weather='title_weather'
                        data_weather='data_weather'
                        isWeather='weather'
                        text_weather='text_weather'

                    />
                </Link>


            </div>

        </div>
    );
}

export default Dashboard;