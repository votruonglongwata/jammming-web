import React from 'react'
import './index.css'

const Track = ({ track, addTrack, isRemoval }) => {
    const handleAdd = () => {
        addTrack(track);
    };
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {
                isRemoval ?
                    <button className="Track-action" onClick={handleAdd}>-</button>
                    : <button className="Track-action" onClick={handleAdd}>+</button>}

        </div>
    )
}

export default Track