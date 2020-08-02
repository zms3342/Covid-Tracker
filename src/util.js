import React from "react";
import { Circle, Popup} from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
    cases:{
        hex: "#5B7594",
        rgb: "rgb(204,16,52)",
        half_op: "rgba(204,16,52,0.5)",
        multiplier: 800,
    },
    recovered: {
        hex:"#56997E",
        rgb:"rgb(125,215,29)",
        half_op: "rgba(125,215,29,0.5)",
        multiplier:1200,
    },
    deaths: {
        hex:"#C2483A",
        rgb:"rgb(251,68,67)",
        half_op: "rgba(251,68,67,0.5)",
        multiplier:2000,

    },
};




//sort list by case count
export const sortData = (data) => {
    const sortedData = [...data];
    
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
}

//interactive circle on map 
export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
 `          <Popup>
                <div className="info-container">
                    <div className="info-name">
                        {country.country}
                    </div>
                    <div className="info-cases">
                        Cases: {numeral(country.cases).format("0,0")}  
                    </div>
                    <div className="info-recovered">
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>

            </Popup>`
        </Circle>
    ))
);

//pretty print
export const prettyPrint = (stat)=> 
    stat ? `+${numeral(stat).format("0.0a")}` : "No Stat Available"