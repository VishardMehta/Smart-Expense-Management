import axios from 'axios';
import { authService } from './authService';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // In production, this would be your backend URL
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
    }
    return Promise.reject(error);
  }
);

/**
 * Mock API service for transactions
 * TODO: Replace with real backend API calls
 */
class ApiService {
  /**
   * Simulates network delay for realistic UX
   */
  async simulateDelay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Load mock data from JSON file
   */
  async loadMockData() {
    try {
      const response = await fetch('/mock/transactions.json');
      return await response.json();
    } catch (error) {
      console.error('Failed to load mock data:', error);
      return [];
    }
  }

  /**
   * Get transactions with optional filters
   * @param {Object} params - Filter parameters
   * @param {string} params.type - 'income' | 'expense' | undefined
   * @param {string} params.from - Start date (ISO string)
   * @param {string} params.to - End date (ISO string)
   * @param {string} params.q - Search query
   * @param {string} params.sort - Sort field and direction (e.g., 'date:desc')
   * @returns {Promise<Array>}
   */
  async getTransactions(params = {}) {
    await this.simulateDelay();
    
    let transactions = await this.loadMockData();
    
    // Apply filters
    if (params.type) {
      transactions = transactions.filter(tx => tx.type === params.type);
    }
    
    if (params.from) {
      transactions = transactions.filter(tx => new Date(tx.date) >= new Date(params.from));
    }
    
    if (params.to) {
      transactions = transactions.filter(tx => new Date(tx.date) <= new Date(params.to));
    }
    
    if (params.q) {
      const query = params.q.toLowerCase();
      transactions = transactions.filter(tx => 
        tx.title.toLowerCase().includes(query) ||
        tx.category.toLowerCase().includes(query) ||
        tx.notes?.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (params.sort) {
      const [field, direction] = params.sort.split(':');
      transactions.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        if (field === 'date') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        
        if (direction === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }
    
    return transactions;
  }

  /**
   * Create a new transaction
   * @param {Object} transaction - Transaction data
   * @returns {Promise<Object>}
   */
  async createTransaction(transaction) {
    await this.simulateDelay();
    
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString(),
    };
    
    // In a real app, this would persist to backend
    console.log('Created transaction:', newTransaction);
    return newTransaction;
  }

  /**
   * Update an existing transaction
   * @param {string} id - Transaction ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>}
   */
  async updateTransaction(id, updates) {
    await this.simulateDelay();
    
    // In a real app, this would update in backend
    const updatedTransaction = { id, ...updates };
    console.log('Updated transaction:', updatedTransaction);
    return updatedTransaction;
  }

  /**
   * Delete a transaction
   * @param {string} id - Transaction ID
   * @returns {Promise<void>}
   */
  async deleteTransaction(id) {
    await this.simulateDelay();
    
    // In a real app, this would delete from backend
    console.log('Deleted transaction:', id);
  }
}

export const apiService = new ApiService();