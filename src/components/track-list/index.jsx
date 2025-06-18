import React from 'react'
import './index.css'
import Track from '../track'

const TrackList = ({ tracks, addTrack, isRemoval }) => {
    return (
        <div className="TrackList">
            {
                tracks.map(track => {
                    return <Track key={track.id} track={track} addTrack={addTrack} isRemoval={isRemoval} />
                })
            }
        </div>
    )
}

export default TrackList