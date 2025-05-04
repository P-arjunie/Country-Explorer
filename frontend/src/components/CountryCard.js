import { useState } from 'react';

export default function CountryCard({ country, onCountrySelect, isLoggedIn, onToggleFavorite, isFavorite, onShowLogin, theme }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFavoriteClick = async (e) => {
    // Prevent card click when clicking favorite button
    e.stopPropagation(); 
    
    if (!isLoggedIn) {
      onShowLogin();
      return;
    }
    
    setIsLoading(true);
    try {
      await onToggleFavorite(country.cca3);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
    setIsLoading(false);
  };
  
  return (
    <div 
      className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300`}
      onClick={() => onCountrySelect(country.cca3)}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        {/* Add a subtle overlay in dark mode*/}
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          
          <h2 className="text-lg font-bold mb-2">{country.name.common}</h2>
          {/* handle adding fav */}
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`p-2 rounded-full ${
              isLoading 
                ? `${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`
                : isLoggedIn 
                  ? (isFavorite 
                    ? 'text-red-500' 
                    : `${theme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`) 
                  : `${theme === 'dark' ? 'text-gray-500' : 'text-gray-300'}`
            } hover:scale-110 transition-transform`}
            title={isLoggedIn ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Login to add to favorites'}
          >
            {isLoading ? '...' : (isFavorite ? '❤️' : '❤')}
          </button>
        </div>
        <p className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
        </p>
        <p className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
          <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
        </p>
      </div>
    </div>
  );
}