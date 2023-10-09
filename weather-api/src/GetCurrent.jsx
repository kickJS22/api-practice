import { useEffect, useState } from "react";

const GEOLOCATION_ENDPOINT = "https://geolocation-db.com/json/"
let API_ENDPOINT = undefined;
export function GetCurrentWeather() {

    const [weather, setWeather] = useState({});

    function updateWeather(feel, temp, state, city) {
        setWeather({
            FeelsLike: feel,
            Temperature: temp,
            WeatherState: state,
            city: city
        })
    }
    useEffect(() => {
        getLocation()
    }, [])

    async function getLocation() {
        const res = await fetch(GEOLOCATION_ENDPOINT)
        const data = await res.json()
        const country = data.country_name;
        const { feel, temp, state } = await getWeather(country)
        updateWeather(feel, temp, state, country)
    }
    async function getWeather(str) {
        const res = await fetch(`https://wttr.in/${str}?format=j2`)
        const data = await res.json()
        const values = data.current_condition[0];
        const feel = values.FeelsLikeC
        const temp = values.temp_C
        const state = values.weatherCode
        return ({ feel, temp, state })
    }

    function imgChange () {
        let src = ""
        let alt = ""
        switch (true) {
            // Sunny
            case weather.WeatherState <= 116:
                src = "https://cdn-icons-png.flaticon.com/512/979/979585.png"
                alt = "Sunny.png"
                return {src, alt}
                break;
            // Cloudy
            case weather.WeatherState > 116 && weather.WeatherState <= 143:
                src = "https://cdn-icons-png.flaticon.com/512/7084/7084486.png"
                alt=  "Cloudy.png"
                return {src, alt}
                break;
            //Raining 
            case weather.WeatherState >= 176 && weather.WeatherState < 320:
                src = "https://cdn-icons-png.flaticon.com/512/116/116251.png"
                alt = "Raining.png"
                return {src,alt}
                break;
            // Snowing https://cdn-icons-png.flaticon.com/512/4107/4107889.png
            case weather.WeatherState >= 320 && weather.WeatherState < 386:
                src = "https://cdn-icons-png.flaticon.com/512/4107/4107889.png"
                alt = "Snowing.png"
                return {src,alt}
                break;
            // Thunders 
            case weather.WeatherState >= 386:
                src = "https://cdn-icons-png.flaticon.com/512/1542/1542643.png"
                alt = "Thundering.png"
                return {src,alt}
                break;
            default:
                src = undefined
                alt = "Image Not Found"
                return {src,alt}
                break;
        }
    }
    console.log(weather)
    return (
        <div id="weatherContainer">
            {
                
                Object.keys(weather).length === 0 
                    ? <h1>Cargando..</h1>
                    : <>
                        {/* {weather.WeatherState == "Despejado" ? <img src="https://cdn-icons-png.flaticon.com/512/979/979585.png" alt="Soleado.png"></img> : null} */}
                        <img src={imgChange().src} alt={imgChange().alt}></img>
                        {/* {imgChange()} */}
                        <h1>Temperatura: {weather.Temperature}°</h1>
                        <h1>Sensación Térmica: {weather.FeelsLike}°</h1>
                        <h1>País: {weather.city}</h1>
                    </>
            }

        </div>
    )

}