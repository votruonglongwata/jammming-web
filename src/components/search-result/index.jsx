import React from 'react'
import TrackList from '../track-list'

const SearchResults = ({ tracks, addTrack }) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={tracks} addTrack={addTrack} />
        </div>
    )
}

export default SearchResults