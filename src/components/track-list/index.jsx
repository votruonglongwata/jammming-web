import React from 'react'
import './index.css'
import Track from '../track'

const TrackList = ({ tracks, onAdd, isRemoval, onRemove }) => {
    return (
        <div className="TrackList">
            {
                tracks.map(track => {
                    return <Track
                        key={track.id}
                        track={track}
                        onRemove={onRemove}
                        onAdd={onAdd}
                        isRemoval={isRemoval}
                    />
                })
            }
        </div>
    )
}

export default TrackList