import React from 'react'

function Searchbar() {
  return (
    <div className="flex w-1/2 justify-center">
        <input
        type="text"
        placeholder="Search..."
        className="w-[50%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 text-gray-900 placeholder-gray-200"
        />
    </div>
  )
}

export default Searchbar;