import { useEffect, useState } from 'react'
import './App.css'
import Playlist from './components/play-list'
import SearchBar from './components/search-bar'
import SearchResults from './components/search-result'
import Spotify from './utils/Spotify'
import { getRequest, postRequestParams } from './services/api'
function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [tracks, setTracks] = useState([])
  const [token, setToken] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchAccessToken = async () => {
      setLoading(true)
      const token = await Spotify.getAccessToken();

      if (token) {
        setToken(token);
      }
      setLoading(false)
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
    if (isTrackExist) {
      alert('Track already in playlist');
      return;
    }

    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  };

  const removeTrack = (id) => {
    const isTrackExist = playlistTracks.find(savedTrack => savedTrack.id === id);
    if (!isTrackExist) return;

    const updatedTracks = playlistTracks.filter(track => track.id !== id);
    setPlaylistTracks(updatedTracks);
  };

  const getCurrentUserId = async () => {
    try {
      const response = await getRequest('/me');

      setUserId(response.data.id);
    } catch (error) {
      console.error('Error when get user id:', error);
    }
  }

  useEffect(() => {
    if (token) {
      getCurrentUserId();
    }
  }, [token]);


  const createPlaylist = async (userId, name, description = '') => {
    try {
      const response = await postRequestParams(`/users/${userId}/playlists`, {
        name,
        description,
        public: false
      });
      return response.data.id;
    } catch (error) {
      console.error('Error when create playlist:', error);
    }
  }

  const addTracksToPlaylist = async (playlistId, uris) => {
    try {
      await postRequestParams(`/playlists/${playlistId}/tracks`, {
        uris
      });
    } catch (error) {
      console.error('Error when add new tracks:', error);
    }
  }

  const savePlaylistToSpotify = async (name, playlistTracks) => {
    if (!playlistTracks.length) {
      alert("Playlist is empty");
      return;
    }
    try {
      const playlistId = await createPlaylist(userId, name, 'Được tạo từ ứng dụng Jammming');
      if (!playlistId) return;

      const uris = playlistTracks.map(track => `spotify:track:${track.id}`);
      await addTracksToPlaylist(playlistId, uris);

      alert("Save to playlist success!");
      setPlaylistTracks([])
    } catch (error) {
      console.log(error);

    }

    playlistTracks = []
  };



  return (
    <div>
      <div className='header'>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
      </div>
      {loading ?
        (<div className="loading">🔐 Logging in Spotify...</div>)
        :
        (
          <div className="app">
            <SearchBar onSearch={handleSearch} />
            <div className="app-playlist">
              <SearchResults tracks={tracks} onAdd={addTrack} isRemoval={false} />
              <Playlist playlistTracks={playlistTracks} isRemoval={true} onRemove={removeTrack} onSubmit={savePlaylistToSpotify} />
            </div>
          </div>
        )
      }

    </div>
  )
}

export default App
