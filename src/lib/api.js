const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper function to make API calls with proper error handling
export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for authentication
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse as JSON, fallback to text if it fails
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// API endpoint helpers
export const api = {
  // Rooms
  getRooms: () => apiCall('/api/rooms'),
  getRoom: (roomCode) => apiCall(`/api/rooms/${roomCode}`),
  createRoom: (roomData) => apiCall('/api/rooms', {
    method: 'POST',
    body: JSON.stringify(roomData),
  }),
  joinRoom: (roomCode, userData) => apiCall(`/api/rooms/${roomCode}/join`, {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  leaveRoom: (roomCode, userData) => apiCall(`/api/rooms/${roomCode}/leave`, {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  setReady: (roomCode, readyData) => apiCall(`/api/rooms/${roomCode}/ready`, {
    method: 'POST',
    body: JSON.stringify(readyData),
  }),
  startGame: (roomCode, gameData) => apiCall(`/api/rooms/${roomCode}/start`, {
    method: 'POST',
    body: JSON.stringify(gameData),
  }),

  // Users
  getUserStats: () => apiCall('/api/users/stats'),
  getUserStatsByUserId: (userId) => apiCall(`/api/users/${userId}/stats`),
  updateUserStats: (userId, statsData) => apiCall(`/api/users/${userId}/stats/update`, {
    method: 'POST',
    body: JSON.stringify(statsData),
  }),
  getUserDebug: () => apiCall('/api/users/debug'),
  verifySession: () => apiCall('/api/users/verify-session'),

  // Testimonials
  getTestimonials: () => apiCall('/api/testimonials'),
  createTestimonial: (testimonialData) => apiCall('/api/testimonials', {
    method: 'POST',
    body: JSON.stringify(testimonialData),
  }),

  // Health
  healthCheck: () => apiCall('/api/health'),

  // Auth (already handled in use-auth.js but here for completeness)
  getAuthMe: () => apiCall('/api/auth/me'),
  logout: () => apiCall('/api/auth/logout', { method: 'POST' }),
  guestLogin: (guestData) => apiCall('/api/auth/guest', {
    method: 'POST',
    body: JSON.stringify(guestData),
  }),
};

export { API_BASE_URL }; 