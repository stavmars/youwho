import React from 'react';
import { IProfilingVariable } from 'app/shared/model/profiling-variable.model';
import { Image } from 'semantic-ui-react';

export interface IProfilingPillProps {
  profilingVariable: IProfilingVariable;
}

export const ProfilingPill = (props: IProfilingPillProps) => {
  const { profilingVariable } = props;
  return (
    <div style={{ display: 'inline-block', padding: '5vh 0 5vh 6vw' }}>
      <div className="results-labels">{profilingVariable.upperEnd.name}</div>
      <Image src="content/images/pill.png" centered />
      <div className="results-labels">{profilingVariable.lowerEnd.name}</div>
    </div>
  );
};
