import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiPlus, FiChevronDown } from 'react-icons/fi';
import { formatDate } from '../utils/dateUtils';
import moment from 'moment';

const Topbar = ({ onMenuClick, onAddTransaction }) => {
  const location = useLocation();
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Overview';
      case '/expense':
        return 'Expenses';
      case '/income':
        return 'Income';
      default:
        return 'Dashboard';
    }
  };

  const generateMonthOptions = () => {
    const options = [];
    for (let i = 0; i < 12; i++) {
      const month = moment().subtract(i, 'months');
      options.push({
        value: month.format('YYYY-MM'),
        label: month.format('MMMM YYYY')
      });
    }
    return options;
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <FiMenu size={20} />
          </button>
          
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-500">
              {formatDate(new Date(), 'dddd, MMMM DD, YYYY')}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Month picker */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-2xl px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            >
              {generateMonthOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Quick add button */}
          <button
            onClick={onAddTransaction}
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-2xl flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <FiPlus size={16} />
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;