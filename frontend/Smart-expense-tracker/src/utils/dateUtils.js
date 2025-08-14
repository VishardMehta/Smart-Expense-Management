import moment from 'moment';

/**
 * Format date for display
 * @param {string|Date} date 
 * @param {string} format 
 * @returns {string}
 */
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  return moment(date).format(format);
};

/**
 * Format date for input fields
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDateForInput = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

/**
 * Get start and end of current month
 * @returns {Object}
 */
export const getCurrentMonth = () => {
  const start = moment().startOf('month').toISOString();
  const end = moment().endOf('month').toISOString();
  return { start, end };
};

/**
 * Get start and end of previous month
 * @returns {Object}
 */
export const getPreviousMonth = () => {
  const start = moment().subtract(1, 'month').startOf('month').toISOString();
  const end = moment().subtract(1, 'month').endOf('month').toISOString();
  return { start, end };
};

/**
 * Get months for chart data (last 6 months)
 * @returns {Array}
 */
export const getLastSixMonths = () => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const month = moment().subtract(i, 'months');
    months.push({
      key: month.format('YYYY-MM'),
      label: month.format('MMM YYYY'),
      start: month.startOf('month').toISOString(),
      end: month.endOf('month').toISOString(),
    });
  }
  return months;
};

/**
 * Check if date is in current month
 * @param {string|Date} date 
 * @returns {boolean}
 */
export const isCurrentMonth = (date) => {
  return moment(date).isSame(moment(), 'month');
};