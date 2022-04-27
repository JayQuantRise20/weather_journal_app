/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip="
let apikey = ",us&appid=54450131af8941e5eaa85f164588bbfa";


document.getElementById("generate").addEventListener('click',performAction);

function performAction(e){

    const zipcode = document.getElementById('zip').value;
    const response = document.getElementById('feelings').value;
    console.log(response);
    getweather(baseURL,zipcode,apikey)
    .then(function(data){
        console.log(data);
        postData('/add',{weather:data.weather,date:newDate,user_response:response});

    });
};

const getweather = async (baseURL,zipcode,key)=>{
    const req = await fetch(baseURL+zipcode+key);
    try{

        const data = await req.json();
        console.log(data); 
        return data;
    }
    catch(error){
        console.log("error",error);
    }
}

const postData = async (url='',data = {})=>{
    const response = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch(error){
            console.log('error',error);
        }

    
}


