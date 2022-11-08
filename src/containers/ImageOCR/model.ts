export type WorkerStatus = {
  workerId: string;
  jobId: string;
  status: string;
  progress: number;
};

export const INITIAL_WORKER_STATUS: WorkerStatus = {
  workerId: '',
  jobId: '',
  status: '',
  progress: 0,
};
