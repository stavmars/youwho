import React from 'react';
import _ from 'lodash';

export interface IProfilingPillProps {
  value: number;
  className?: string;
}

export const ProfilingPill = (props: IProfilingPillProps) => {
  const { value, className } = props;
  if (!_.isNumber(value)) {
    return <div className={`pill ${className || ''}`} />;
  }
  return (
    <div className={`pill ${className || ''}`}>
      <span className="pill-label pill-label-top">{_.round((1 - value) * 100, 1)}%</span>
      <div className="pill-bar" style={{ height: `${(1 - value) * 100}%` }} />
      <span className="pill-label pill-label-bottom">{_.round(value * 100, 1)}%</span>
    </div>
  );
};
