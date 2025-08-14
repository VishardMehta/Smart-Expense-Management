/**
 * Format currency amount
 * @param {number} amount 
 * @param {string} currency 
 * @returns {string}
 */
export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${amount.toLocaleString('en-IN')}`;
};

/**
 * Calculate savings rate
 * @param {number} income 
 * @param {number} expense 
 * @returns {number}
 */
export const calculateSavingsRate = (income, expense) => {
  if (income === 0) return 0;
  return Math.round(((income - expense) / income) * 100);
};

/**
 * Get category color
 * @param {string} category 
 * @returns {string}
 */
export const getCategoryColor = (category) => {
  const colors = {
    Food: '#ef4444',
    Housing: '#3b82f6',
    Transportation: '#f59e0b',
    Utilities: '#10b981',
    Entertainment: '#8b5cf6',
    Health: '#ec4899',
    Shopping: '#f97316',
    Education: '#06b6d4',
    Travel: '#84cc16',
    Insurance: '#6366f1',
    Salary: '#22c55e',
    Freelance: '#a855f7',
    Investment: '#14b8a6',
  };
  
  return colors[category] || '#6b7280';
};

/**
 * Truncate text
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};