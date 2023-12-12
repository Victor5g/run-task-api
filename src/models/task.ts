export enum ModelTaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface ModelTasks {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: string;
  projectId: string;
}

export interface ModelTags {
  id: string;
  title: string;
  taskId: string;
}

export interface ModelDetailedTask extends ModelTasks {
  tags: Array<ModelTags>;
}
