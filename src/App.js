import React,{useState, useEffect} from 'react';
import './App.css';
import {
  FormControl, 
  Select,
  MenuItem,
  Card,
  CardContent,} from '@material-ui/core';
import InfoBox from "./components/InfoBox"
import Map from "./components/Map"
import Table from "./components/Table"
import LineGraph from "./components/LineGraph"
import {sortData} from "./util"
import "leaflet/dist/leaflet.css";


function App() {
  //state populated with api countries
  const [countries, setCountries] =useState([])

  //state for setting the dropdown value
  const [selected, setSelected]=useState('worldwide');

  //State for Country Information
  const [countryInfo, setCountryInfo] = useState({})

  //State for Table Data
  const [tableData, setTableData]= useState([])

  //Map center State
  const [center, setCenter]= useState({lat:34.80746, lng:10.4796});

  //Map zoom State
  const [zoom, setZoom] = useState(2)

  //set selected, give functionality to onchange
  const onSelectionChange = async(event) => {
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`
  
    await fetch(url)
    .then(response => response.json())
    .then(data=> {
      setSelected(countryCode)
      setCountryInfo(data)     
      setCenter([data.countryInfo.lat, data.countryInfo.long])
      setZoom(4)
    })
  }

  //Fetches worldwide covid data and sets it 
  //to country info state on page load
  useEffect(() =>
  {
    const worldData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/all")
      .then((response)=> response.json())
      .then((data)=>{
        setCountryInfo(data)
      })
    };
    worldData()
  },[])

  //Loads country codes into state when page loads
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
        const sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
       })
    };
    //call sub function
    countriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
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
    
        <div className="app__stats">
          <InfoBox title="Cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
        </div>
    
        <div className="app__map">
          <Map center={center}
          zoom={zoom} />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Wordlwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>            
    </div>
  );
}

export default App;
