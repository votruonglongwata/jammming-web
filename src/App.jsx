import { useEffect, useState } from 'react'
import './App.css'
import Playlist from './components/play-list'
import SearchBar from './components/search-bar'
import SearchResults from './components/search-result'
import Spotify from './utils/Spotify'
import { setSpotifyAccessToken } from './config/setSpotifyToken'
import { getRequest } from './services/api'
function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [tracks, setTracks] = useState([])
  const [token, setToken] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([])

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await Spotify.getAccessToken();
      if (!token) {
        console.error("Access token retrieval failed.");
        return;
      }

      console.log('app token: ', token);

      if (token) {
        setSpotifyAccessToken(token);
        console.log("Token has been set to axios:", token);
        setToken(token);
      }
    }
    fetchAccessToken()
  }, [])

  const search = async (term) => {
    try {

      const response = await getRequest(`/search?q=${term}&type=track&limit=8`)
      const data = response.data?.tracks?.items?.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name
      })) || [];

      setTracks(data)

    } catch (error) {
      console.error("Seach error:", error);
      return [];
    }
  }


  const handleSearch = async (term) => {
    if (!token) {
      console.warn("Waiting for token...");
      return;
    }
    setSearchTerm(term)
    search(term)
  }

  const addTrack = (track) => {
    const isTrackExist = playlistTracks.find(savedTrack => savedTrack.id === track.id);
    if (isTrackExist) alert('track has exist in playlist');

    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  };

  const removeTrack = (id) => {
    const isTrackExist = playlistTracks.find(savedTrack => savedTrack.id === id);
    if (!isTrackExist) return;

    const updatedTracks = playlistTracks.filter(track => track.id !== id);
    setPlaylistTracks(updatedTracks);
  };



  return (
    <div>
      <div className='header'>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
      </div>
      <div className="app">

        <SearchBar onSearch={handleSearch} />
        <div className="app-playlist">
          <SearchResults tracks={tracks} onAdd={addTrack} isRemoval={false} />
          <Playlist playlistTracks={playlistTracks} isRemoval={true} onRemove={removeTrack} />
        </div>
      </div>
    </div>
  )
}

export default App
