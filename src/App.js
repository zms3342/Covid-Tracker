import React,{useState, useEffect} from 'react';
import './App.css';
import {
  FormControl, 
  Select,
  MenuItem} from '@material-ui/core';

function App() {
  const [countries, setCountries] =useState([])

  useEffect(()=>{
    //async to get data 
    const countriesData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data) => {
        //reformat data
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }));
        //set state countries
        setCountries(countries);
       })
    };
    //call sub function
    countriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select
        varient="outline"
        value="worldwide"
        onChange="" >
          {
            countries.map((country) => (
              <MenuItem value ={country.value}>{country.name}</MenuItem>
              )
            )}
        </Select>
      </FormControl>
      </div>
    </div>
  );
}

export default App;
