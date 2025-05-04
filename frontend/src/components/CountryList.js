import CountryCard from './CountryCard';

export default function CountryList({ 
  countries, 
  onCountrySelect, 
  isLoggedIn, 
  favorites, 
  onToggleFavorite, 
  onShowLogin,
  theme 
}) {
  if(countries.length === 0){
    return(
      <div className="text-center py-8">
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>
          No countries found matching your criteria.
        </p>
      </div>
    );
  }
  
  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {countries.map(country => (
        <CountryCard
          key={country.cca3}
          country={country}
          onCountrySelect={onCountrySelect}
          isLoggedIn={isLoggedIn}
          isFavorite={favorites?.includes(country.cca3)}
          onToggleFavorite={onToggleFavorite}
          onShowLogin={onShowLogin}
          theme={theme}
        />
      ))}
    </div>
  );
}