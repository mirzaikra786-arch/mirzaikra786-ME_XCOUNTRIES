import { useEffect, useState } from "react";

const Card = ({flag, name}) => {
    return (
 <div
    style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        gap:"4px",
        padding: "10px",
        border:"1px solid gray",
        borderRadius:"4px",
        height:"200px",
        width:"200px",
        textAlign:"center"
    }}
 >
 <img src={flag} alt={`Flag of ${name}`} 
 style={{height:"75px", width:"100px"}}/>
 <h2>{name}</h2>
 </div>
    );
};

const API = "https://xcountries-backend.labs.crio.do/all";
export default function Countries(){
 const [countries, setCountries] = useState([]);

 useEffect(()=>{
     const fetchCountries= async ()=>{
       try{
        const response= await fetch(API);
    const jsonRes = await response.json();
         setCountries(jsonRes);
       } catch(error){
        console.error("Error fetching data:", error);
       }
        }; 
        fetchCountries();
    },[]);    
 return(
    <div
    style={{
        display:"flex",
        flexWrap:"wrap",
        gap: "10px",
        justifyContent:"center"
    }}>
     {countries.map((country) => 
     <Card flag={country.flag} name={country.name} key={country.abbr}/>)}
    </div>
 );
}