import React from 'react';
import './App.css';
import Banner from './Banner';
import Navbar from './Navbar';
import requests from './Requests';
import Row from './Row';


function App() {
  return ( <
    div className = "app" >
     {/*Navbar */}
     <Navbar />
      {/*Banner */}
      <Banner />
    <Row title = "NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals}
      isLargeRow={true}
    /> 
    <Row title = "Trending Now" fetchUrl = {requests.fetchTrending}/> 
    <Row title = "Top Rated" fetchUrl = {requests.fetchTopRated}/> 
    <Row title = "Action Movies" fetchUrl = {requests.fetchActionMovies} /> 
    <Row title = "Comedy Movies" fetchUrl = {requests.fetchComedyMovies}/>
    <Row title = "Horror Movies" fetchUrl = {requests.fetchHorrorMovies}/> 
    <Row title = "Romance" fetchUrl = {requests.fetchRomanceMovies } /> 
    <Row title = "Documentries"  fetchUrl = {requests.fetchDocumentaries } /> 
    </div>
  );
}

export default App;