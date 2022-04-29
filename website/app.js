/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// save the base url and api keys in the gloabal variables
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
// please enter your own api key here
const apikey = ""
const api_id = `,us&appid=${apikey}`;
const units = "&units=metric";



// event listener to button Generate to update the UI using Get and post requests
document.getElementById("generate").addEventListener('click',performAction);

function performAction(e){

    // get the values inside elements zipcodes and feelings in the HTML(input from user)
    const zipcode = document.getElementById('zip').value;
    const response = document.getElementById('feelings').value;

    if (zipcode==""){
        alert("Zip Code is not provided");
    }

    
    // use api credentials to extract the weather data from the external resource
    getweather(baseURL,zipcode,api_id,units)
    .then(function(data){
        // post data  
        postData('/add',{temperature:data.main.temp,date:newDate,user_response:response});
        
    })
    // update the UI dynamically 
    .then(function() {
        updateUI()
    });
};

const getweather = async (baseURL,zipcode,api_id,units)=>{
    const req = await fetch(baseURL+zipcode+api_id+units);
    try{

        const data = await req.json();
        return data
    }
    catch(error){
        console.log("error",error);
    }
}

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try{
        const newData = await response.json();
        
        return newData
    } catch(error){
            console.log('error',error);
        }

    
};


const updateUI = async ()=> {
    const request = await fetch('/all');
    try{
        // transform into json
        const allData = await request.json();
        // write the updated data to DOM elements
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
   
    } catch(error){
        console.log('error',error);
        // appropriately handle the error
    }
}


