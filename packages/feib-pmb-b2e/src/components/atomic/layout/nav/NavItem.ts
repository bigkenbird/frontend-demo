export default interface Navitem {
  label: string;
  sub?: Navitem[];
  taskId?: string;
}
