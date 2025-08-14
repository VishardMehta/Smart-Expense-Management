import React, { useState, useEffect } from "react";
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiPieChart 
} from 'react-icons/fi';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import KpiCard from '../../components/KpiCard';
import TransactionsList from '../../components/TransactionsList';
import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import AddTransactionModal from '../../components/AddTransactionModal';
import { apiService } from '../../services/api';
import { formatCurrency, calculateSavingsRate, getCategoryColor } from '../../utils/formatUtils';
import { getCurrentMonth, getLastSixMonths, isCurrentMonth } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await apiService.getTransactions({ sort: 'date:desc' });
      setTransactions(data);
    } catch (error) {
      toast.error('Failed to load transactions');
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      await apiService.createTransaction(transactionData);
      toast.success('Transaction added successfully!');
      loadTransactions();
    } catch (error) {
      toast.error('Failed to add transaction');
      console.error('Error adding transaction:', error);
    }
  };

  const handleEditTransaction = async (transactionData) => {
    try {
      await apiService.updateTransaction(editingTransaction.id, transactionData);
      toast.success('Transaction updated successfully!');
      setEditingTransaction(null);
      loadTransactions();
    } catch (error) {
      toast.error('Failed to update transaction');
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
      await apiService.deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
      loadTransactions();
    } catch (error) {
      toast.error('Failed to delete transaction');
      console.error('Error deleting transaction:', error);
    }
  };

  // Calculate KPIs
  const currentMonth = getCurrentMonth();
  const currentMonthTransactions = transactions.filter(tx => 
    isCurrentMonth(tx.date)
  );
  
  const currentMonthIncome = currentMonthTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const currentMonthExpense = currentMonthTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalBalance = currentMonthIncome - currentMonthExpense;
  const savingsRate = calculateSavingsRate(currentMonthIncome, currentMonthExpense);

  // Prepare chart data
  const monthlyData = getLastSixMonths().map(month => {
    const monthTransactions = transactions.filter(tx => 
      tx.date >= month.start && tx.date <= month.end
    );
    
    const income = monthTransactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const expense = monthTransactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    return {
      month: month.label,
      income,
      expense
    };
  });

  // Prepare category data for pie chart
  const expensesByCategory = currentMonthTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const categoryData = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
      color: getCategoryColor(category)
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 categories

  const recentTransactions = transactions.slice(0, 5);

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Balance"
          value={formatCurrency(totalBalance)}
          icon={<FiDollarSign size={24} />}
          color={totalBalance >= 0 ? 'green' : 'red'}
        />
        <KpiCard
          title="This Month Income"
          value={formatCurrency(currentMonthIncome)}
          icon={<FiTrendingUp size={24} />}
          color="green"
        />
        <KpiCard
          title="This Month Expense"
          value={formatCurrency(currentMonthExpense)}
          icon={<FiTrendingDown size={24} />}
          color="red"
        />
        <KpiCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon={<FiPieChart size={24} />}
          color={savingsRate >= 20 ? 'green' : savingsRate >= 10 ? 'blue' : 'red'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Income vs Expense (Last 6 Months)
          </h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stackId="1" 
                  stroke="#22c55e" 
                  fill="#22c55e" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="expense" 
                  stackId="2" 
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState 
              icon="📊"
              title="No data available"
              description="Add some transactions to see your spending trends."
            />
          )}
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Expense by Category (This Month)
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState 
              icon="🥧"
              title="No expenses this month"
              description="Start adding expenses to see category breakdown."
            />
          )}
          
          {/* Legend */}
          {categoryData.length > 0 && (
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(category.value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Transactions
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Add Transaction
          </button>
        </div>
        
        {recentTransactions.length > 0 ? (
          <TransactionsList
            transactions={recentTransactions}
            onEdit={setEditingTransaction}
            onDelete={handleDeleteTransaction}
          />
        ) : (
          <EmptyState
            icon="💳"
            title="No transactions yet"
            description="Add your first transaction to get started with expense tracking."
            actionText="Add Transaction"
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
        type="expense"
      />
    </div>
  );
};

export default Home;