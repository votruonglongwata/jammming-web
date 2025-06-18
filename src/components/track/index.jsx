import React from 'react'
import './index.css'

const Track = ({ track, onAdd, isRemoval, onRemove }) => {
    const handleClick = () => {
        if (isRemoval) {
            onRemove(track.id)
        }
        else {
            onAdd(track);
        }

    };
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button className="Track-action" onClick={handleClick}>{isRemoval ? '-' : '+'}</button>


        </div>
    )
}

export default Track