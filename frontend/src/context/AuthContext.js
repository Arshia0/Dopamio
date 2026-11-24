import { apiUrl } from "../utils/api";
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    );

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
          (config) => {
            if (authTokens) {
              config.headers['Authorization'] = `Bearer ${authTokens.access}`;
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        return () => {
          axios.interceptors.request.eject(requestInterceptor);
        };
      }, [authTokens]);

    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch(apiUrl('/api/users/login/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone_number: e.target.phone_number.value,
                password: e.target.password.value,
            }),
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
          } else {
            alert('Something went wrong!');
          }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    const updateToken = async () => {
        if (!authTokens) {
            setLoading(false);
            return;
        }
        const response = await fetch(apiUrl('/api/users/token/refresh/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else if (response.status === 401) {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const fourMinutes = 1000 * 60 * 4;

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    const authFetch = async (url, options = {}) => {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${authTokens?.access}`,
            'Content-Type': 'application/json',
        };

        const response = await fetch(url, options);

        if (response.status === 401) {
            logoutUser();
        }

        return response;
    };

    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser, authFetch }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
