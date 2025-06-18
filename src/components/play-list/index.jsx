import React from 'react'
import './index.css'
import TrackList from '../track-list'

const Playlist = ({ playlistTracks, isRemoval }) => {
    return (
        <div className="Playlist">
            <input defaultValue="New Playlist" />
            <TrackList tracks={playlistTracks} isRemoval={isRemoval} />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist