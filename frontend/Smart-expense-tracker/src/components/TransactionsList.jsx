import { formatCurrency, truncateText } from '../utils/formatUtils';
import { formatDate } from '../utils/dateUtils';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const TransactionsList = ({ 
  transactions, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

const TransactionItem = ({ transaction, onEdit, onDelete, showActions }) => {
  const isExpense = transaction.type === 'expense';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Emoji/Icon */}
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl">
            {transaction.emoji || (isExpense ? '💸' : '💰')}
          </div>
          
          {/* Transaction details */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">
              {transaction.title}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-lg">
                {transaction.category}
              </span>
              <span>•</span>
              <span>{formatDate(transaction.date)}</span>
            </div>
            {transaction.notes && (
              <p className="text-sm text-gray-600 mt-1">
                {truncateText(transaction.notes, 60)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Amount */}
          <div className="text-right">
            <div className={`font-bold text-lg ${
              isExpense ? 'text-red-600' : 'text-green-600'
            }`}>
              {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(transaction)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Edit transaction"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(transaction.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete transaction"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;