// Frontend authentication service for communicating with backend
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

class AuthService {
  constructor() {
    this.token = null;
    this.user = null;
    
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('auth_user');
        }
      }
    }
  }

  // Get current authentication status
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Get auth token
  getToken() {
    return this.token;
  }

  // Set authentication data
  setAuth(token, user) {
    this.token = token;
    this.user = user;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  }

  // Clear authentication data
  clearAuth() {
    this.token = null;
    this.user = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }

  // Make authenticated API request
  async makeAuthenticatedRequest(url, options = {}) {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    return response;
  }

  // Get current user from backend
  async fetchCurrentUser() {
    try {
      const response = await this.makeAuthenticatedRequest('/auth/me');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.user = data.user;
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_user', JSON.stringify(data.user));
          }
          return data.user;
        }
      }
      
      // If request fails, clear auth data
      this.clearAuth();
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      this.clearAuth();
      return null;
    }
  }

  // Start Google OAuth flow
  initiateGoogleAuth() {
    window.location.href = `${API_BASE_URL}/auth/google`;
  }

  // Create guest user
  async createGuest(name) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          this.setAuth(data.token, data.user);
          return data.user;
        }
      }
      
      throw new Error('Failed to create guest user');
    } catch (error) {
      console.error('Error creating guest user:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await this.makeAuthenticatedRequest('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.clearAuth();
    }
  }

  // Handle OAuth success (called from success page)
  handleOAuthSuccess(token, user) {
    this.setAuth(token, user);
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService; 