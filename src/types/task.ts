export type StepStatus = 'pending' | 'running' | 'waiting' | 'done';
export type StepType = 'thinking' | 'tool';

export interface ExecutionStep {
  id: string;
  title: string;
  type: StepType;
  status: StepStatus;
  toolName?: string;
  toolInput?: string;
  description?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
}

export type TaskRecordStatus = 'success' | 'error';

export interface TaskRecord {
  id: string;
  input: string;
  status: TaskRecordStatus;
  steps: ExecutionStepRecord[];
  result: string;
  createdAt: number;
  totalDuration?: number;
}

export interface ExecutionStepRecord {
  id: string;
  title: string;
  type: StepType;
  status: 'done';
  toolName?: string;
  toolInput?: string;
  description?: string;
  duration?: number;
}

export type ExecutionControlMode = 'autonomous' | 'guided' | 'manual';
