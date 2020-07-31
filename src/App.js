import React,{useState, useEffect} from 'react';
import './App.css';
import {
  FormControl, 
  Select,
  MenuItem} from '@material-ui/core';

function App() {
  //state populated with api countries
  const [countries, setCountries] =useState([])

  //state for setting the dropdown value
  const [selected, setSelected]=useState('worldwide');

  //set selected, give functionality to onchange
  const onSelectionChange = async(event) => {
    const countryCode = event.target.value;
    setSelected(countryCode)
  }

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
        value={selected}
        onChange={onSelectionChange} >
        <MenuItem value="worldwide">Worldwide</MenuItem>
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
