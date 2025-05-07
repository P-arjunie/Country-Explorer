import { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/Dropdown';
import { authService } from './services/auth';
import FavoritesList from './components/FavoritesList';

// Main App Component
export default function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [theme, setTheme] = useState('light');

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Fetch all countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch countries based on filters when dependencies change
  useEffect(() => {
    if (searchTerm) {
      fetchCountriesByName(searchTerm);
    } else if (regionFilter) {
      fetchCountriesByRegion(regionFilter);
    } else if (countries.length === 0) {
      fetchCountries();
    }
  }, [searchTerm, regionFilter]);

  // Add this function to handle authenticated requests
  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    return fetch(url, options);
  };

  // Fetch all countries using /all endpoint
  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      const response = await authenticatedFetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Fetch countries by name using /name/{name} endpoint
  const fetchCountriesByName = async (name) => {
    if (!name.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await authenticatedFetch(`https://restcountries.com/v3.1/name/${name}`);
      if (!response.ok) {
        if (response.status === 404) {
          setFilteredCountries([]);
          setIsLoading(false);
          return;
        }
        throw new Error('Failed to fetch countries by name');
      }
      const data = await response.json();
      
      // If region filter is active, apply it client-side after name search
      if (regionFilter) {
        const filtered = data.filter(country => country.region === regionFilter);
        setFilteredCountries(filtered);
      } else {
        setFilteredCountries(data);
      }
      
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Fetch countries by region using /region/{region} endpoint
  const fetchCountriesByRegion = async (region) => {
    setIsLoading(true);
    try {
      const response = await authenticatedFetch(`https://restcountries.com/v3.1/region/${region}`);
      if (!response.ok) {
        throw new Error('Failed to fetch countries by region');
      }
      const data = await response.json();
      
      // If search term is active, apply it after region filter
      if (searchTerm) {
        //filter the countries by the search term
        const filtered = data.filter(country => 
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
      } else {
        setFilteredCountries(data);
      }
      
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Get country details using /alpha/{code} endpoint
  const selectCountry = async (code) => {
    setIsLoading(true);
    try {
      const response = await authenticatedFetch(`https://restcountries.com/v3.1/alpha/${code}`);
      if (!response.ok) {
        throw new Error('Failed to fetch country details');
      }
      const data = await response.json();
      setSelectedCountry(data[0]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle region filter change
  const handleRegionChange = (e) => {
    setRegionFilter(e.target.value);
  };

  // Handle back button in country detail view
  const handleBack = () => {
    setSelectedCountry(null);
  };

  // Handle login
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  // Add this useEffect to check for existing session
  useEffect(() => {
    const token = localStorage.getItem('token');
    //get the user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
        setIsLoggedIn(true);
        setUser(user);
    }
  }, []);

  // Fetch list of regions for filter dropdown
  // Using endpoint: /all?fields=region
  const [regions, setRegions] = useState([]);
  
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=region');
        if (!response.ok) {
          throw new Error('Failed to fetch regions');
        }
        const data = await response.json();
        //get the unique regions
        const uniqueRegions = [...new Set(data.map(country => country.region))].filter(Boolean);
        setRegions(uniqueRegions);
      } catch (err) {
        console.error('Error fetching regions:', err);
      }
    };
    
    fetchRegions();
  }, []);

  // Handle favorite toggling
  const handleToggleFavorite = async (countryCode) => {
    if (!isLoggedIn) {
      setShowLoginForm(true);
      return;
    }
    
    try {
      const response = await fetch('https://country-explorer-orpin.vercel.app/api/auth/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ countryCode })
      });

      if (!response.ok) throw new Error('Failed to update favorites');

      const data = await response.json();
      setFavorites(data.favorites);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  // Add this effect to load favorites when user logs in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn) return;
      
      try {
        const response = await fetch('https://country-explorer-orpin.vercel.app/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch favorites');
        
        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);

  // Add handler for showing/hiding favorites
  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const handleCloseFavorites = () => {
    setShowFavorites(false);
  };

  const handleShowLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'} transition-colors duration-300`}>
      <Header 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout}
        onShowFavorites={handleShowFavorites}
        theme={theme}
        toggleTheme={toggleTheme}
        onShowLogin={handleShowLogin}
      />
      
      {showFavorites && isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto p-6 m-4`}>
            <FavoritesList
              countries={countries}
              favorites={favorites}
              onCountrySelect={(code) => {
                selectCountry(code);
                handleCloseFavorites();
              }}
              onClose={handleCloseFavorites}
              theme={theme}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero banner when no country is selected */}
        {!selectedCountry && !isLoading && !error && (
          <div className={`mb-12 text-center ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-600'} text-white p-8 rounded-lg shadow-lg`}>
            <h1 className="text-4xl font-bold mb-4">Explore Our World</h1>
            <p className="text-xl">Discover information about countries around the globe</p>
          </div>
        )}
        {/* if the country is selected, get the country details */}
        {selectedCountry ? (
          //get the country details
          <CountryDetail 
            country={selectedCountry} 
            onBack={handleBack} 
            theme={theme} 
            isLoggedIn={isLoggedIn}
            isFavorite={favorites.includes(selectedCountry.cca3)}
            onToggleFavorite={() => handleToggleFavorite(selectedCountry.cca3)}
          />
        ) : (
          <>
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="w-full md:w-1/2">
                <SearchBar searchTerm={searchTerm} onSearch={handleSearch} theme={theme} />
              </div>
              <div className="w-full md:w-1/4">
                <FilterDropdown 
                  regions={regions} 
                  selectedRegion={regionFilter} 
                  onRegionChange={handleRegionChange}
                  theme={theme}
                />
              </div>
              {!isLoggedIn && (
                <div className={`w-full md:w-1/4 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-blue-100'} p-4 rounded-lg transition-colors`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-blue-200' : 'text-blue-800'}`}>
                    <button 
                      onClick={() => setShowLoginForm(true)} 
                      className={`${theme === 'dark' ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'} font-medium hover:underline`}
                    >
                      Log in
                    </button>
                    {' '}to add countries to your favorites
                  </p>
                </div>
              )}
            </div>
            {/* if the countries are loading, show the loading spinner */}
            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'} mb-4`}></div>
                <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Loading countries...</p>
              </div>
            ) : error ? (
              //if the countries are not loading, show the error message
              <div className={`${theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-700'} text-center py-8 rounded-lg shadow`}>
                <p className="text-xl mb-4">{error}</p>
                <button 
                  onClick={fetchCountries}
                  className={`px-6 py-2 ${theme === 'dark' ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg transition-colors shadow hover:shadow-lg`}
                >
                  Try Again
                </button>
              </div>
              //if the countries are not loading, show the error message
            ) : filteredCountries.length === 0 ? (
              <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-xl mb-4">No countries found matching your search</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setRegionFilter('');
                    fetchCountries();
                  }}
                  className={`px-6 py-2 ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-500 hover:bg-indigo-600'} text-white rounded-lg transition-colors shadow hover:shadow-lg`}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <CountryList 
                countries={filteredCountries} 
                onCountrySelect={selectCountry}
                isLoggedIn={isLoggedIn}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onShowLogin={handleShowLogin}
                theme={theme}
              />
            )}
          </>
        )}
      </div>

      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all`}>
            <LoginForm 
              onLogin={(userData) => {
                handleLogin(userData);
                setShowLoginForm(false);
              }}
              onClose={() => setShowLoginForm(false)}
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
}
