import React from 'react'
import './index.css'
import Track from '../track'

const TrackList = ({ tracks }) => {
    return (
        <div className="TrackList">
            {/* <!-- You will add a map method that renders a set of Track components  --> */}
            {
                tracks.map(track => {
                    return <Track key={track.id} track={track} />
                })
            }
        </div>
    )
}

export default TrackList