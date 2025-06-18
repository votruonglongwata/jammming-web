import React from 'react'
import './index.css'

const Playlist = () => {
    return (
        <div className="Playlist">
            <input value="New Playlist" />
            {/* track list */}
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist