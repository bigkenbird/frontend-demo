export interface QueryTask {
  taskId: string;
  label: string;
  queryFlag: string;
}

export interface FlowTask extends QueryTask {
  editFlag: string;
  approveFlag: string;
}

export default interface GroupModel {
  groupId: string;
  groupName: string;
  queryTasks: QueryTask[];
  flowTasks: FlowTask[];
}
