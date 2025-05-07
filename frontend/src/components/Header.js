export default function Header({ isLoggedIn, user, onLogout, onShowFavorites, theme, toggleTheme, onLoginClick }) {
  // Vibrant blue theme with gradient and modern styling
  return (
    <header className={`${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white' 
        : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 text-white'
    } shadow-lg transition-all duration-300`}>
      <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo & Brand Area */}
        <div className="flex items-center">
          <div className="text-2xl font-extrabold mb-2 sm:mb-0 flex items-center">
            <span className="text-3xl mr-2">🌎</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-indigo-100 tracking-tight">
              Where in the world?
            </span>
          </div>
          
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme} 
            className={`ml-5 p-3 rounded-full ${
              theme === 'dark' 
                ? 'bg-blue-800 text-yellow-300 hover:bg-blue-700' 
                : 'bg-white text-indigo-900 hover:bg-blue-50'
            } transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        {/* Navigation & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
          {isLoggedIn && (
            <button
              onClick={onShowFavorites}
              className={`px-5 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-indigo-800 text-white hover:bg-indigo-700' 
                  : 'bg-white text-blue-700 hover:bg-blue-50'
              } flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium`}
            >
              <span className="mr-2 text-red-400 hover:text-red-300 text-xl animate-pulse">❤</span>
              Favorites
            </button>
          )}
          
          {/* Login/Logout section */}
          {isLoggedIn ? (
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <span className={`px-4 py-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-indigo-800/70 text-blue-200 border border-blue-700' 
                  : 'bg-white/90 text-blue-800 border border-blue-200'
              } truncate max-w-[180px] text-center font-medium shadow-inner`}>
                {user?.email}
              </span>
              <button
                onClick={onLogout}
                className={`w-full sm:w-auto px-6 py-3 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400' 
                    : 'bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300'
                } text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1`}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className={`px-8 py-3 rounded-lg ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400' 
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500'
              } text-white font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 uppercase text-sm`}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
