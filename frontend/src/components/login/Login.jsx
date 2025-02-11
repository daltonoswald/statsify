import { useEffect, useState } from 'react'
// import { loginEndpoint } from '../../unused/loginEndpoint'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import '../homepage/homepage.styles.css'
import Footer from '../nav/Footer';

export default function Login() {
  const spotifyToken = localStorage.getItem('spotifyToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (spotifyToken) {
        navigate('/home')
    }
  },[spotifyToken])

  // const handleTest = async (e) => {
  //   e.preventDefault();
  //   // const url = 'http://localhost:3000/test'
  //   const url = `https://statsify-production.up.railway.app/test`

  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       mode: 'cors',
  //     })
  //     const data = await response.json();
  //     if (!response.ok) {
  //       console.log('error')
  //       console.log(response);
  //     }
  //     if (response.ok) {
  //       console.log(data)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <>
          <div className='content'>
            <div className='welcome-message'>
              <h1>Welcome to Statsify</h1>
              <h2>Find your top Artists and Songs</h2>
              <h2>Explore Spotify&apos;s catalogue</h2>
              {/* <a href={loginEndpoint}>Log In With Spotify</a> */}
              {/* <a href='http://localhost:3000'>Login With Spotify</a> */}
              <a href='https://statsify-production.up.railway.app'>Login With Spotify</a>
            </div>
            {/* <button onClick={handleTest}>Test</button> */}
          </div>
          <Footer />
    </>
  )
}