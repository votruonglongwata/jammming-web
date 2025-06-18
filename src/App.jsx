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

  // Utility to generate code challenge from verifier





  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scopes.join(' '))}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  }

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await Spotify.getAccessToken();
      if (token) {
        setSpotifyAccessToken(token); // cập nhật vào axios headers
        setToken(token); // cập nhật vào state nếu cần
      }
    }
    fetchAccessToken()
  }, [])


  const search = async (term) => {
    try {
      const response = await getRequest(`/search?type=track&q=${encodeURIComponent(term)}`)

      const data = response.tracks?.items?.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name,
        album: track.album?.name,
        uri: track.uri,
      })) || [];

      setTracks(data)
    } catch (error) {
      console.error("Seach error:", error);
      return [];
    }
  }

  const handleSearch = async (term) => {
    setSearchTerm(term)
    search(term)
  }

  return (
    <div>
      <div className='header'>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <button type='button' className='login-button' onClick={redirectToSpotifyLogin}>
          Login with Spotify
        </button>
      </div>
      <div className="app">

        <SearchBar onSearch={handleSearch} />
        <div className="app-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  )
}

export default App
