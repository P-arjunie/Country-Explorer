// Filter Dropdown Component
export default function FilterDropdown({ regions, selectedRegion, onRegionChange, theme }) {
  return (
    <div className="w-full md:w-48">
      <div className="relative">
        <select
          value={selectedRegion}
          onChange={onRegionChange}
          className={`w-full px-4 py-2 appearance-none ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500'
              : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
          } border rounded shadow-sm focus:outline-none focus:ring-2 transition-colors duration-300`}
        >
          <option value="">Filter by Region</option>
          {regions.map(region => (
            <option 
              key={region} 
              value={region}
              className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
            >
              {region}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg 
            className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
