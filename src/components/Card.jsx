import '../assets/styles/card.css'

const Card = ({ title, text, data, typeOfCard, img, isWeather, title_weather, data_weather, text_weather }) => {

    return (
        <div className={`container_card ${typeOfCard} ${isWeather}`}>

            <div className={`container_title_card ${title_weather}`}>
                <p className='card_title'>{title}</p>
            </div>
            <div className={`container_data_card ${data_weather}`}>
                <p className="data_card">{data}</p>

            </div>

            <div className={`container_text_card ${text_weather}`}>
                {img && (
                    <div className='container_image_card'>
                        <img className='' src={img} alt='weather' />
                    </div>
                )}
                <p className="text_card ">{text}</p>
            </div>

        </div>
    );

}

export default Card;