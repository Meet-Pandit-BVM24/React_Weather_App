import React, { useState, useEffect } from 'react'
import Clock from "react-live-clock";
import "./Show.css"

let api = "<YOUR_API_KEY>"
const dateBuilder = (d) => {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
};
const obj = {
    description: "",
    temperature: "",
    humidity: "",
    visibility: "",
    windspeed: "",
    country: "",
    name: "",
    code: ""
}
const CurrentObj = {
    description: "",
    temperature: "",
    humidity: "",
    visibility: "",
    windspeed: "",
    country: "",
    name: "",
    code: ""
}
var lat, lng;
export default function Show() {
    const [info, setInfo] = useState(obj);
    const [search, setSearch] = useState("");
    const [current, SetCurrent] = useState(CurrentObj);

    const fetchByCord = async (lat, lon) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${api}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            const resjson = await response.json();
            console.log(resjson);
            SetCurrent({
                description: resjson.weather[0].main,
                temperature: resjson.main.temp,
                country: resjson.sys.country,
                name: resjson.name,
                code: resjson.cod
            });

        }
        catch (err){
            alert(err);
        }
    }
    const fetchApi = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${api}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            const resjson = await response.json();

            setInfo({
                description: resjson.weather[0].main,
                temperature: resjson.main.temp,
                humidity: resjson.main.humidity,
                visibility: resjson.visibility,
                windspeed: resjson.wind.speed,
                country: resjson.sys.country,
                name: resjson.name,
                code: resjson.cod
            });
        }
        catch (err) {
            console.log(err);
            alert("City Not Found.Check City Spelling or May Be City Details is not Avaialble at Backend Now.Try After Some Time");
        }
    }


    const handleOnClick = () => {
        if (search === "") {
            alert("Enter City Name");
        }
        else {
            fetchApi();
            setSearch("");
        }
    }


    useEffect(() => {

        if ("geolocation" in navigator) {
            // Prompt user for permission to access their location
            navigator.geolocation.getCurrentPosition(

                (position) => {

                    lat = position.coords.latitude;
                    lng = position.coords.longitude;


                    console.log(`Latitude: ${lat}, longitude: ${lng}`);
                    fetchByCord(lat, lng);
                },
                // Error callback function
                (error) => {

                    alert(" You Need To Give Location permission To View your City's Weather ");
                    console.log("Error getting User location:", error.message);
                }

            );
        } else {

            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
        }
    }, [])




    return (

        <>
            <div className="container">
                <div className="left-box text-white">

                    <div className="CurrentCity mx-2" >
                        <b>{current.name}</b><br />{current.country}
                    </div>

                    <div className="bottomClock">
                        <div className="current-time  mx-2 ">
                            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                        </div>
                        <div className="current-date mx-2 my-1">{dateBuilder(new Date())}</div>

                    </div>
                    <div className="temperature mx-3">
                        <p>
                            {current.temperature}{current.temperature !== ""?<span>°c</span>:""}
                        </p>

                    </div>
                </div>

                <div className="right-box">
                    <div className="display1">

                        <div className="custom ">
                            <input type="text" name="SearchBox" className='Search my-1 mx-4' id="1" value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder='  Search any city....' />
                            <button type="button" className="btn btn-primary btn-sm" onClick={handleOnClick}><i className="fa-sharp fa-solid fa-magnifying-glass" ></i></button>
                        </div>

                        <div className="desc">
                            {info.description}
                        </div>

                    </div>
                    <div className="display2">
                        <div className="Cityname text-center">{info.name}  {info.name !== "" ?",":""} {info.country}</div>

                        <hr /><div className="itemShow ">Temperature {info.temperature !== "" ? <span> {info.temperature}°C</span> : ""}   </div>
                        <hr /> <div className="itemShow ">Humidity {info.humidity !== "" ? <span>{info.humidity}%</span> : ""} </div>
                        <hr /> <div className="itemShow ">Visibility {info.visibility !== "" ? <span>{info.visibility}mi</span> : ""} </div>
                        <hr /> <div className="itemShow "> Wind Speed {info.windspeed !== "" ? <span>{info.windspeed}km/h</span> : ""} </div>

                    </div>
                </div>
            </div >
        </>
    )

}
