// import './App.css';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import '../../styles/UserHeader.css';
import CountUpTimer from "./CountUpTimer";

function Header() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [countries,setCountries] = useState([]);
  const [selectedCountry,setSelectedCountry] = useState("Africa/Abidjan");
  
  const GoBack = ()=>{
    navigate("/");
  }

  const getCountries = async ()=>{
    await axios.get("http://worldtimeapi.org/api/timezone")
    .then(function (response) {
        // handle success
        setCountries(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
  }

  const SelectedCountry = async (event) =>{
    const SelectedCountry = event.target.value;
    console.log("Selected Country "+SelectedCountry);
    setSelectedCountry(SelectedCountry);
  }

  useEffect(()=>{
    getCountries();
    console.log(countries);
  },[]);

  return (
    <div className="UserDetail-header">
      <button onClick={GoBack}>Back</button>
      <div>
        <select name="country" id="country" onChange={SelectedCountry} value={"Africa/Abidjan"}>
          {countries.map((country)=>
            <option key={country} value={country}>{country}</option>
          )}
        </select>
        <CountUpTimer CountrySelected={selectedCountry}/>
      </div>
    </div>
  );
}

export default Header;