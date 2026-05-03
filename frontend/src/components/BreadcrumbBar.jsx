import React from 'react';
import { Link } from 'react-router-dom';

// items: [{ label: string, to?: string }]
const BreadcrumbBar = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="text-sm text-gray-500">
      <nav className="flex items-center gap-2 flex-wrap">
        
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const content = item.to && !isLast ? (
            <Link to={item.to} className="hover:text-gray-700 hover:underline underline-offset-4 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={isLast ? 'text-gray-700 font-medium' : ''}>{item.label}</span>
          );

          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              {idx > 0 && <span className="text-gray-300 select-none">/</span>}
              {content}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default BreadcrumbBar;

