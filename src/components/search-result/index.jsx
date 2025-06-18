import React from 'react'
import TrackList from '../track-list'

const SearchResults = ({ tracks, onAdd }) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={tracks} onAdd={onAdd} />
        </div>
    )
}

export default SearchResults