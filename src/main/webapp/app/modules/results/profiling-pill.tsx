import React from 'react';
import { IProfilingVariable } from 'app/shared/model/profiling-variable.model';

export interface IProfilingPillProps {
  profilingVariable: IProfilingVariable;
  value: number;
}

export const ProfilingPill = (props: IProfilingPillProps) => {
  const { profilingVariable, value } = props;
  return (
    <div style={{ display: 'inline-block', padding: '5vh 0 5vh 6vw' }}>
      <div className="results-labels">{profilingVariable.upperEnd.name}</div>
      <div className="pill">
        <div className="pill-bar" style={{ height: `${(1 - value) * 100}%` }} />
      </div>
      <div className="results-labels">{profilingVariable.lowerEnd.name}</div>
    </div>
  );
};
