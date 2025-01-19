import React, { useEffect, useState } from 'react'

import './Search.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
  onSearch: (term: string) => void
}


const Search = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearchInput = (term: string) => {
    setSearchTerm(term)
  }

  useEffect(() => {
    onSearch && onSearch(searchTerm)
  }, [searchTerm])

  return (
    <div className='searchInputHolder'>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input className='searchInput' type="text" placeholder='Search' onChange={(e) => handleSearchInput(e.target.value)} />
    </div>
  )
}

export default Search