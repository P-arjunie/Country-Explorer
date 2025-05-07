export default function Header({ isLoggedIn, user, onLogout, onShowFavorites, theme, toggleTheme, onLoginClick }) {
  return (
    <header className={`${theme === 'dark' ? 'bg-blue-900 text-blue-50' : 'bg-blue-50 text-blue-900'} shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2 sm:mb-0">
            Where in the world?
          </h1>
          
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme} 
            className={`ml-5 p-2 rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-800 text-blue-200 hover:bg-blue-700 hover:text-blue-100' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800'
            } transition-all duration-200`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
          {isLoggedIn && (
            <button
              onClick={onShowFavorites}
              className={`px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              } flex items-center justify-center transition-colors duration-200`}
            >
              <span className="mr-2 text-red-500">❤</span>
              Favorites
            </button>
          )}
          
          {/* Login/Logout section */}
          {isLoggedIn ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <span className={`px-3 py-1 rounded-full ${
                theme === 'dark' 
                  ? 'bg-blue-800 text-blue-200' 
                  : 'bg-blue-100 text-blue-700'
              } truncate max-w-[150px] text-center font-medium`}>
                {user?.email}
              </span>
              <button
                onClick={onLogout}
                className={`w-full sm:w-auto px-5 py-2 ${
                  theme === 'dark'
                    ? 'bg-red-600 hover:bg-red-500' 
                    : 'bg-red-500 hover:bg-red-400'
                } text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow`}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className={`px-6 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-blue-700 hover:bg-blue-600' 
                  : 'bg-blue-600 hover:bg-blue-500'
              } text-white font-medium transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-px`}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
