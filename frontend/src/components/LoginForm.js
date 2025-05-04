// Login Form Component
import { useState } from 'react';
import { authService } from '../services/auth';

export default function LoginForm({ onLogin, onClose }) {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    //handle the submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            let data;
            if (isRegister) {
                data = await authService.register(
                    formData.name,
                    formData.email,
                    formData.password
                );
            } else {
                data = await authService.login(
                    formData.email,
                    formData.password
                );
            }
            onLogin(data.user);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-90 flex items-center justify-center z-50">
            <div className="max-w-md w-full bg-white rounded-lg p-6 border-2 border-blue-300 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    {/* if the user is registering, show the create account title */}
                    <h2 className="text-2xl font-bold text-blue-700">
                        {isRegister ? 'Create Account' : 'Sign In'}
                    </h2>
                    {/* close button */}
                    <button 
                        onClick={onClose}
                        className="text-blue-500 hover:text-white hover:bg-blue-500 rounded-full p-2 transition"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 text-center bg-red-50 rounded p-2">{error}</div>
                    )}
                    {isRegister && (
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    )}
                    <div>
                        {/* email input */}
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="block w-full px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        {/* password input */}
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="block w-full px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <div>
                        {/* submit button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {isRegister ? 'Register' : 'Sign in'}
                        </button>
                    </div>
                    <div className="text-center">
                        {/* if the user is not registering, show the Login button */}
                        <button
                            type="button"
                            className="text-blue-600 hover:text-blue-800 underline"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}