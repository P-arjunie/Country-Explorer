import { useEffect, useState } from "react";

export default function CountryDetail({
  country, 
  onBack, 
  theme, 
  isLoggedIn, 
  isFavorite, 
  onToggleFavorite
}) {
  const [borderCountries, setBorderCountries] = useState([]);
  const [loadingBorders, setLoadingBorders] = useState(false);
  
  // languages
  const languages = country.languages ?
    Object.values(country.languages).join(', ') :
    'No languages available';

  // currencies
  const currencies = country.currencies ? 
    Object.values(country.currencies).map(c => c.name).join(', ') :
    'No currencies available';

  // fetch border countries info
  useEffect(() => {
    const fetchBorderCountries = async () => {
      if(!country.borders || country.borders.length === 0) {
        return;
      }

      setLoadingBorders(true);
      try {
        const codes = country.borders.join(',');
        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`);
        if(!response.ok) {
          throw new Error('Failed to fetch border countries');
        }
        const data = await response.json();
        setBorderCountries(data);
        setLoadingBorders(false);
      } catch(err) {
        console.error('Error fetching border countries: ', err);
        setLoadingBorders(false);
      }
    };
    //fetch the border countries
    fetchBorderCountries();
  }, [country.borders]); 

  return(
    <div className={`p-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-8">
        {/* back button */}
        <button 
          onClick={onBack}
          className={`px-6 py-2 ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} rounded shadow flex items-center transition-colors duration-300`}
        >
          ← Back
        </button>
        {/* if the user is logged in, show the favorite button */}
        {isLoggedIn && (
          <button
            onClick={() => onToggleFavorite()}
            className={`flex items-center gap-2 px-4 py-2 rounded ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-300`}
          >
            <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
            <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-auto shadow-lg rounded"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{country.name.common}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div className="space-y-2">
              <p><span className="font-semibold">Native Name: </span> {
                country.name.nativeName ?
                Object.values(country.name.nativeName)[0].common :
                country.name.common
              }</p>
              <p><span className="font-semibold">Population: </span> {country.population.toLocaleString()}</p>
              <p><span className="font-semibold">Region: </span> {country.region}</p>
              <p><span className="font-semibold">Sub Region: </span> {country.subregion || 'None'}</p>
              <p><span className="font-semibold">Capital: </span> {country.capital ? country.capital[0] : 'None'}</p>
            </div>

            <div className="space-y-2">
              <p><span className="font-semibold">Top Level Domain: </span> {country.tld ? country.tld[0] : 'None'}</p>
              <p><span className="font-semibold">Currencies: </span> {currencies}</p>
              <p><span className="font-semibold">Languages: </span> {languages}</p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {loadingBorders ? (
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Loading border countries...
                  </p>
                ) : (
                  borderCountries.map(border => (
                    <span 
                      key={border.cca3} 
                      className={`px-4 py-1 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow rounded text-sm transition-colors duration-300`}
                    >
                      {border.name.common}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}