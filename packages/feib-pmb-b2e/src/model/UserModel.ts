import GroupModel from './GroupModel';

export default interface UserModel {
  userName: string;
  devision: string;
  permission: GroupModel;
}
