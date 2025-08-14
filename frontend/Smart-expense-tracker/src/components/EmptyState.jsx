const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-6xl mb-4 opacity-50">
        {icon || '📊'}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title || 'No data available'}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {description || 'Get started by adding your first transaction.'}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;