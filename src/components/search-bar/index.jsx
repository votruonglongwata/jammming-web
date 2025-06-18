import React from 'react'
import { useState } from 'react';
import './index.css'

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleClick = () => {
        if (term.trim()) {
            onSearch(term);
        }
    };
    return (
        <div className="SearchBar">
            <input type="text"
                placeholder="Enter a song, album, or artist"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button className="SearchButton" onClick={handleClick}>SEARCH</button>
        </div>
    )
}

export default SearchBar