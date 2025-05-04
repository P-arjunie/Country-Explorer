export default function Header({ isLoggedIn, user, onLogout, onShowFavorites, theme, toggleTheme }) {
  return (
    <header className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mb-2 sm:mb-0">Where in the world?</h1>
          
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme} 
            className={`ml-4 p-2 rounded-full ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {isLoggedIn && (
            <button
              onClick={onShowFavorites}
              className={`px-4 py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} flex items-center`}
            >
              <span className="mr-2">❤</span>
              Favorites
            </button>
          )}
          {/* if the user is logged in, show the logout button */}
          {isLoggedIn ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <span className={`truncate max-w-[120px] text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {user?.email}
              </span>
              <button
                onClick={onLogout}
                className={`w-full sm:w-auto px-4 py-2 ${theme === 'dark' ? 'bg-red-600 hover:bg-red-500' : 'bg-red-500 hover:bg-red-600'} text-white rounded transition-colors`}
              >
                Logout
              </button>
            </div>
            //if the user is not logged in, show the login button 
          ) : (
            <span className={`w-full text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Login</span>
          )}
        </div>
      </div>
    </header>
  );
}