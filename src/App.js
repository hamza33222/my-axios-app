//->Axios is a light weight package through which u can make http request in any js library
//->if u have any api link and u need its data then u would use axios.
//axios is updrade of fetch api
//->difference between fetch and axios is that in fetch after getting the data we need   to parse it in the json format whereas in axios its already in the json format.
//->we can make all the requests using axios.
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [myData, setmyData] = useState([]);
  const [isError, setIsError] = useState("");
  //using promise
  //i want to run this only one time so i m going to 
  //use useEffect
  useEffect(()=>{
    //as i want to read data from the link so 
    // i am gonna use get
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>
    setmyData(res.data)) //here i stores the data from the api in setmyData
    //here we will do the error handling
    .catch((error) => setIsError(error.message));

  },[]);
  return (
   <>
   <h1>Axiios Tutorial</h1>
   {/* if there is error and the show below line otherwise not */}
   {isError !== "" && <h2>{isError}</h2>}
   <div className='grid'>
   {myData.map((post) => {
    const { id, title, body } = post;
    return (
    <div className='card' key={id}>
      <h2>{title.slice(0,15).toUpperCase()}</h2>
      <p>{body.slice(0,100)}</p>
    </div>
    );
   })}
   </div>
   </>
  );
}
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  //to add somthing we make use of js Object
  // Object.assign(config,{test : '1212'});
  // console.log(config);
  document.getElementById('overlay').style.display='block';
  console.log('req');
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // Object.assign(response,{test : '1212'});
  // console.log(response);
  document.getElementById('overlay').style.display='none';
  console.log('res');
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
export default App;
