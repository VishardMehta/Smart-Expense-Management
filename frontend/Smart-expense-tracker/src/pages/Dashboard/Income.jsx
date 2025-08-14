import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import TransactionsList from '../../components/TransactionsList';
import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import AddTransactionModal from '../../components/AddTransactionModal';
import { apiService } from '../../services/api';
import { formatDateForInput } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

const Income = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    sort: 'date:desc'
  });

  const categories = [
    'Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other'
  ];

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, filters]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await apiService.getTransactions({ 
        type: 'income',
        sort: filters.sort 
      });
      setTransactions(data);
    } catch (error) {
      toast.error('Failed to load income');
      console.error('Error loading income:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.title.toLowerCase().includes(query) ||
        tx.category.toLowerCase().includes(query) ||
        tx.notes?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(tx => tx.category === filters.category);
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(tx => new Date(tx.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      filtered = filtered.filter(tx => new Date(tx.date) <= new Date(filters.dateTo));
    }

    // Sort
    const [field, direction] = filters.sort.split(':');
    filtered.sort((a, b) => {
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

    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      await apiService.createTransaction({ ...transactionData, type: 'income' });
      toast.success('Income added successfully!');
      loadTransactions();
    } catch (error) {
      toast.error('Failed to add income');
      console.error('Error adding income:', error);
    }
  };

  const handleEditTransaction = async (transactionData) => {
    try {
      await apiService.updateTransaction(editingTransaction.id, transactionData);
      toast.success('Income updated successfully!');
      setEditingTransaction(null);
      loadTransactions();
    } catch (error) {
      toast.error('Failed to update income');
      console.error('Error updating income:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!confirm('Are you sure you want to delete this income?')) return;
    
    try {
      await apiService.deleteTransaction(id);
      toast.success('Income deleted successfully!');
      loadTransactions();
    } catch (error) {
      toast.error('Failed to delete income');
      console.error('Error deleting income:', error);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      sort: 'date:desc'
    });
  };

  if (loading) {
    return <Loader text="Loading income..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Income</h1>
          <p className="text-gray-600">
            {filteredTransactions.length} income source{filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-2xl flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <FiPlus size={20} />
          <span>Add Income</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search income..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Category */}
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Date From */}
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />

          {/* Date To */}
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="date:desc">Newest First</option>
            <option value="date:asc">Oldest First</option>
            <option value="amount:desc">Highest Amount</option>
            <option value="amount:asc">Lowest Amount</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(filters.search || filters.category || filters.dateFrom || filters.dateTo) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
            >
              <FiFilter size={14} />
              <span>Clear Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        {filteredTransactions.length > 0 ? (
          <TransactionsList
            transactions={filteredTransactions}
            onEdit={setEditingTransaction}
            onDelete={handleDeleteTransaction}
          />
        ) : (
          <EmptyState
            icon="💰"
            title="No income found"
            description={
              transactions.length === 0 
                ? "Add your first income source to get started with tracking your earnings."
                : "Try adjusting your filters to find the income you're looking for."
            }
            actionText="Add Income"
            onAction={() => setShowAddModal(true)}
          />
        )}
      </div>

      {/* Add/Edit Transaction Modal */}
      <AddTransactionModal
        isOpen={showAddModal || !!editingTransaction}
        onClose={() => {
          setShowAddModal(false);
          setEditingTransaction(null);
        }}
        onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
        transaction={editingTransaction}
        type="income"
      />
    </div>
  );
};

export default Income;