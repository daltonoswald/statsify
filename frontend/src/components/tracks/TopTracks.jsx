import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import './tracks.styles.css'
import Nav from '../nav/Nav';

export default function TopTracks() {
    const { state } = useLocation();
    console.log(state);
    const [topTracks, setTopTracks] = useState(null);
    const [term, setTerm] = useState('medium');
    const navigate = useNavigate();
    const spotifyApi = new SpotifyWebApi();
  
    useEffect(() => {
      if (!state) {
        navigate('/');
      } else {
        handleGetTopTracks();
      }
    },[state])
  
    const handleGetTopTracks = (e) => {
        if (e) {
            spotifyApi.setAccessToken(state.spotifyToken);
            spotifyApi.getMyTopTracks({time_range: (e.target.id + '_term')}).then((tracks) => {
                setTerm(e.target.id)
                setTopTracks(tracks.items)
                console.log(tracks.items)
            })
        } else {
            spotifyApi.setAccessToken(state.spotifyToken);
            spotifyApi.getMyTopTracks({time_range: 'medium_term'}).then((tracks) => {
                setTopTracks(tracks.items)
                console.log(tracks.items)
            })
        }
    }


      return (
        <>
        <Nav />
            <div className='content'>
                <div>Your tracks based on {term} length.
                    <button id="short" onClick={handleGetTopTracks} className={(term === 'short' ? 'active' : '')} >Get Top Tracks (Short)</button>
                    <button id="medium" onClick={handleGetTopTracks} className={(term === 'medium' ? 'active' : '')} >Get Top Tracks (Medium)</button>
                    <button id="long" onClick={handleGetTopTracks} className={(term === 'long' ? 'active' : '')} >Get Top Tracks (Long)</button>
                </div>
                <div className='track-container'>
                    {topTracks && (
                        topTracks.map((track) => (
                            <div key={track.id} className='track'>
                                <a href={track.external_urls.spotify}>
                                    <img src={track.album.images[0].url} className='album-image'/>
                                </a>
                                <div className='track-info'>
                                    <a href={track.uri} className='track-name'>{track.name}</a>
                                    <a href={track.artists[0].uri} className='track-artist'>{track.artists[0].name}</a>
                                    {/* <a href={track.album.uri} className='track-album'>{track.album.name}</a> */}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
      )
}