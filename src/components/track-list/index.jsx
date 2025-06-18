import React from 'react'
import './index.css'
import Track from '../track'

const TrackList = ({ tracks, addTrack }) => {
    return (
        <div className="TrackList">
            {
                tracks.map(track => {
                    return <Track key={track.id} track={track} addTrack={addTrack} />
                })
            }
        </div>
    )
}

export default TrackList