import React from 'react';
import { IProfilingVariable } from 'app/shared/model/profiling-variable.model';
import _ from 'lodash';

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
        <span className="pill-label pill-label-top">{_.round((1 - value) * 100, 1)}%</span>
        <div className="pill-bar" style={{ height: `${(1 - value) * 100}%` }} />
        <span className="pill-label pill-label-bottom">{_.round(value * 100, 1)}%</span>
      </div>
      <div className="results-labels">{profilingVariable.lowerEnd.name}</div>
    </div>
  );
};
