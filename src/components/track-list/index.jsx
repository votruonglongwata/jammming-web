import React from 'react'
import './index.css'
import Track from '../track'

const TrackList = ({ tracks }) => {
    return (
        <div className="TrackList">
            {
                tracks.map(track => {
                    return <Track key={track.id} track={track} />
                })
            }
        </div>
    )
}

export default TrackList