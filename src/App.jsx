import './App.css'
import Playlist from './components/play-list'
import SearchBar from './components/search-bar'
import SearchResults from './components/search-result'
function App() {

  const clientId = '9cadc247ee634265b68c5d118ac46480';
  const redirectUri = 'https://localhost:5173';
  const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-private',
  ];



  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${clientId}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scopes.join(' '))}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  }
  return (
    <div>
      <div className='header'>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <button type='button' className='login-button' onClick={handleLogin}>
          Login with Spotify
        </button>
      </div>
      <div className="app">

        <SearchBar />
        <div className="app-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  )
}

export default App
