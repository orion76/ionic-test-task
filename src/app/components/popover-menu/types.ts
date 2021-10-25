export interface IMenuItem {
  text: string;
  command: () => any;
}

export interface IPopoverMenuService {
  show(items: IMenuItem[]);
}
