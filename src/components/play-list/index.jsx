import React from 'react'
import './index.css'

const Playlist = () => {
    return (
        <div class="Playlist">
            <input value="New Playlist" />
            {/* track list */}
            <button class="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist