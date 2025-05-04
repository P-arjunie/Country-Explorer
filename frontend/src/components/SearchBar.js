// Search Bar Component
export default function SearchBar({ searchTerm, onSearch, theme }) {
  return (
    <div className="relative w-full md:w-64">
      {/* search bar */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={onSearch}
        className={`w-full px-4 py-2 ${
          theme === 'dark' 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500'
            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500'
        } border rounded shadow-sm focus:outline-none focus:ring-2 transition-colors duration-300`}
      />
      {/* search icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg 
          className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          aria-hidden="true"
        >
          {/* search icon */}
          <path 
            fillRule="evenodd" 
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  );
}