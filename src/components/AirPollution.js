import React, { useState } from 'react'
import "./AirPollution.css"


const obj = {
    aqi: "",
    pm25: "",
    pm10: "",
    co: "",
    no: "",
    no2: "",
    o3: "",
    so2: "",
    nh3: "",
    message :""
}
const corrdinateInfo = {
    lat: 0,
    lon: 0,
    country: "",
    cityName: "",
    stte: ""
}

export default function AirPollution() {
    const [search, setSearch] = useState();
    const [info, setInfo] = useState(obj);
    const [cord, setCord] = useState(corrdinateInfo);


    const HandleOnClick = () => {
        if (search === "") {
            alert("Enter City Name");
        }
        else {
            fetchCord();
        }
    }

    const fetchCord = async () => {

        try {
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=2&appid=e2d023b018b931d352b12d9a422483d0`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            const resjson = await response.json();
            console.log(resjson[0]);

            setCord({
                lat: resjson[0].lat,
                lon: resjson[0].lon,
                country: resjson[0].country,
                cityName: resjson[0].name,
                stte: resjson.state
            }
            )
            fetchData();

        } catch (err) {
            console.log(err);
            alert("City not Found or Check Entered Spelling of City");
        }


    }
    const fetchData = async () => {

        try {

            const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${cord.lat}&lon=${cord.lon}&appid=e2d023b018b931d352b12d9a422483d0`
            const response = await fetch(url);
            const resjson = await response.json();

            setInfo({
                aqi: resjson.list[0].main.aqi,
                pm25: resjson.list[0].components.pm2_5,
                pm10: resjson.list[0].components.pm10,
                co: resjson.list[0].components.co,
                no: resjson.list[0].components.no,
                no2: resjson.list[0].components.no2,
                o3: resjson.list[0].components.o3,
                so2: resjson.list[0].components.so2,
                nh3: resjson.list[0].components.nh3
            });
            console.log(info);
            setSearch("");
 
        }
        catch (err) {
            console.log(err);
            alert("!!Error.Try after Sometime.");
        }

    }
    return (
        <>
            <div className="Search">
                <input type="text" name="SearchBox" className='Search my-1 mx-4' id="1" value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder='  Search any city....' />
                <button type="button" className="btn btn-primary btn-sm" onClick={HandleOnClick}><i className="fa-sharp fa-solid fa-magnifying-glass" ></i></button>
            </div>
            <div className="AIRcontainer text-white">
                <div className="items mx-3">

                    <div className="item my-1 first-span">
                        <b> <span>(μg/m3)</span></b>
                    </div>
                    <div className="item">
                        <b>PM 2.5</b> <span>{info.pm25}</span>
                    </div>
                    <div className="item">
                        <b>PM 10</b> <span>{info.pm10}</span>
                    </div>
                    <div className="item">
                        <b>CO</b> <span>{info.co}</span>
                    </div>
                    <div className="item">
                        <b>NO</b> <span>{info.no}</span>
                    </div>
                    <div className="item">
                        <b>NO<sub>2</sub></b> <span>{info.no2}</span>
                    </div>
                    <div className="item">
                        <b>O<sub>3</sub></b> <span>{info.o3}</span>
                    </div>
                    <div className="item">
                        <b>SO<sub>2</sub></b> <span>{info.so2}</span>
                    </div>
                    <div className="item">
                        <b>NH<sub>3</sub></b> <span>{info.nh3}</span>
                    </div>
                    <div className="item ">
                    
                        <b>AQI </b> <span>{info.aqi} </span>
                    </div>
                </div>
            </div>
        </>
    )
}
