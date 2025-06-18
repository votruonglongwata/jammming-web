import React from 'react'
import './index.css'
import TrackList from '../track-list'
import { useState } from 'react'

const Playlist = ({ playlistTracks, isRemoval, onRemove, onSubmit }) => {
    const [playListName, setPlayListName] = useState('')

    const handleAddPlaylist = () => {
        onSubmit(playListName, playlistTracks)
    }
    return (
        <div className="Playlist">
            <input defaultValue="New Playlist" onChange={e => setPlayListName(e.target.value)} />
            <TrackList tracks={playlistTracks} isRemoval={isRemoval} onRemove={onRemove} />
            <button className="Playlist-save" onClick={handleAddPlaylist}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist