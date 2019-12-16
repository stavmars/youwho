export interface IProfilingVariable {
  id: string;
  name: string;
  lowerEnd: IProfilingVariableType;
  upperEnd: IProfilingVariableType;
}

export interface IProfilingVariableType {
  name: string;
  description?: string;
}
