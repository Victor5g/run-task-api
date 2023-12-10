import { ModelMember } from './member';
import { ModelTasks } from './task';

export interface ModelProject{
  id: string;
  name: string;
  description: string;
  creatorId: string;
}

export interface ModelProjects extends ModelProject {
  members: Array<ModelMember>;
  tasks: Array<ModelTasks>;
}
