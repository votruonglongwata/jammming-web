import React from 'react'
import './index.css'
import TrackList from '../track-list'

const Playlist = ({ playlistTracks, isRemoval, onRemove, onSubmit }) => {
    return (
        <div className="Playlist">
            <input defaultValue="New Playlist" />
            <TrackList tracks={playlistTracks} isRemoval={isRemoval} onRemove={onRemove} />
            <button className="Playlist-save" onClick={onSubmit}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist