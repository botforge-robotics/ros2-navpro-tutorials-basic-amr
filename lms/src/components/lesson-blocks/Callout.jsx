import React from 'react';
import { Info, Lightbulb, AlertTriangle, AlertOctagon } from 'lucide-react';

export function Callout({ 
  type = "note", 
  title, 
  children, 
  className = "" 
}) {
  const normalizedType = type.toLowerCase();

  const renderIcon = () => {
    switch (normalizedType) {
      case 'tip':
        return <Lightbulb size={18} className="alert-custom-icon" />;
      case 'warning':
        return <AlertTriangle size={18} className="alert-custom-icon" />;
      case 'important':
        return <AlertOctagon size={18} className="alert-custom-icon" />;
      case 'note':
      default:
        return <Info size={18} className="alert-custom-icon" />;
    }
  };

  const defaultTitle = () => {
    switch (normalizedType) {
      case 'tip':
        return 'PRO-TIP';
      case 'warning':
        return 'WARNING';
      case 'important':
        return 'IMPORTANT';
      case 'note':
      default:
        return 'NOTE';
    }
  };

  return (
    <div className={`alert-callout alert-${normalizedType} ${className}`}>
      <div className="alert-icon">
        {renderIcon()}
      </div>
      <div className="alert-body">
        {title && <strong className="alert-title">{title || defaultTitle()}</strong>}
        {children}
      </div>
    </div>
  );
}

export default Callout;
