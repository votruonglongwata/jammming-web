import React from 'react'
import './index.css'

const Track = ({ track }) => {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button className="Track-action">+ or -</button>
        </div>
    )
}

export default Track