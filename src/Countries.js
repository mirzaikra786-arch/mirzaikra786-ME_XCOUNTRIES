import { useEffect, useState } from "react";

const Card = ({flag, name}) => {
 return (
 <div className="countryCard"
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
    }}>
 <img src={flag} alt={`Flag of ${name}`} 
 style={{height:"75px", width:"100px"}}/>
 <h2>{name}</h2>
 </div>
    );
};

export default function Countries(){
   const [countries, setCountries] = useState([]);
   const [value, setValue] = useState("");
   const [filteredcountries, setFilteredcountries] =useState([]);
   const [flag, setFlag]= useState(false);

   const handleChange=(e)=>{
    const value = e.target.value;
    const filtered= countries.filter((eachCountry)=>(eachCountry.common.includes(value)));
    setFilteredcountries(filtered);
    setValue(value);
    if(value!==""){
      setFlag(true);
    }
   }

  useEffect(() =>{
   fetchCountries(value);
   }, [value]);

   useEffect(()=>{
        fetchCountries();
     },[]);  

     const fetchCountries= async (value = "")=>{
      let API = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
      
       try{
        const response= await fetch(API);
    const jsonRes = await response.json();
         setCountries(jsonRes);
       } catch(error){
        console.error("Error fetching data:", error);
       }
        }; 
        
     return(  
       <>
      <div style={{margin:"10px"}}><input type="text" placeholder="Search for countries..." onChange={handleChange}></input>
      </div>
      <div 
      style={{
        display:"flex",
        flexWrap:"wrap",
        gap: "10px",
        justifyContent:"center" }}>
       { (!flag)  && (countries.map((country) => 
        <Card flag={country.png} name={country.common}/>))}
        {flag && (filteredcountries.map((country) => 
        <Card flag={country.png} name={country.common}/>))}
        </div>
         </>);
      }