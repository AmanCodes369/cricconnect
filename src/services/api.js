// API Base URL - Change this when deploying to production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Matches API
export const matchesAPI = {
  // Get all matches with optional filters
  getAll: async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const url = query ? `${API_BASE_URL}/matches?${query}` : `${API_BASE_URL}/matches`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  // Get single match by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch match');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching match:', error);
      throw error;
    }
  },

  // Get live match count
  getLiveCount: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches/live/count`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch live count');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching live count:', error);
      throw error;
    }
  }
};

// Chat API
export const chatAPI = {
  // Get all chat messages
  getMessages: async (limit = 100, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat?limit=${limit}&page=${page}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Post new chat message
  postMessage: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to post message');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error posting message:', error);
      throw error;
    }
  },

  // Delete chat message
  deleteMessage: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  // Get chat statistics
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/stats/summary`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
};

// Predictions API
export const predictionsAPI = {
  // Get all predictions
  getAll: async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const url = query ? `${API_BASE_URL}/predictions?${query}` : `${API_BASE_URL}/predictions`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching predictions:', error);
      throw error;
    }
  },

  // Get single prediction by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/predictions/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching prediction:', error);
      throw error;
    }
  },

  // Get upcoming match predictions
  getUpcoming: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/predictions/upcoming/matches`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming predictions');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming predictions:', error);
      throw error;
    }
  }
};

// Export everything as default as well
export default {
  matches: matchesAPI,
  chat: chatAPI,
  predictions: predictionsAPI
};