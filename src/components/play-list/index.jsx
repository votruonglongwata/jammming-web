import React from 'react'
import './index.css'
import TrackList from '../track-list'
import { useState } from 'react'

const Playlist = ({ playlistTracks, isRemoval, onRemove, onSubmit }) => {
    const [name, setName] = useState('New Playlist')

    const handleAddPlaylist = () => {
        onSubmit(name, playlistTracks)
        setName('New Playlist')
    }
    return (
        <div className="Playlist">
            <input defaultValue="New Playlist" onChange={e => setName(e.target.value)} />
            <TrackList tracks={playlistTracks} isRemoval={isRemoval} onRemove={onRemove} />
            <button className="Playlist-save" onClick={handleAddPlaylist}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist