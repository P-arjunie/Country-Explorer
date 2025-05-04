export default function FavoritesList({ countries, favorites, onCountrySelect, onClose }) {
  // Filter countries to show only favorites
  const favoriteCountries = countries.filter(country => 
    favorites.includes(country.cca3)
  );

  return (
    <div className="fixed inset-0 bg-blue-100 bg-opacity-90 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-lg border-2 border-blue-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-700">Favorite Countries</h2>
          <button 
            onClick={onClose}
            className="text-blue-500 hover:text-white hover:bg-blue-500 rounded-full p-2 transition"
            title="Close"
          >
            ✕
          </button>
        </div>

        {favoriteCountries.length === 0 ? (
          <p className="text-center text-blue-500 py-8 bg-blue-50 rounded">
            No favorite countries yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteCountries.map(country => (
              <div 
                key={country.cca3}
                className="border-2 border-blue-200 rounded-lg p-4 cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition"
                onClick={() => {
                  onCountrySelect(country.cca3);
                  onClose();
                }}
              >
                {/* if the country is selected, get the country details */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={country.flags.png} 
                    alt={`Flag of ${country.name.common}`}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-blue-700">{country.name.common}</h3>
                    <p className="text-sm text-blue-500">{country.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
