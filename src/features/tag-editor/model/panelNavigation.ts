import { makeAutoObservable } from 'mobx';

export type PanelType = 'main' | 'create' | 'edit' | 'styles';

export class PanelNavigationStore {
  currentPanel: PanelType = 'main';
  editingTagId: string | null = null;
  isOpen: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  get isEditing(): boolean {
    return this.currentPanel === 'edit' && this.editingTagId !== null;
  }

  goToMain(): void {
    this.currentPanel = 'main';
    this.editingTagId = null;
  }

  goToCreate(): void {
    this.currentPanel = 'create';
    this.editingTagId = null;
  }

  goToEdit(tagId: string): void {
    this.currentPanel = 'edit';
    this.editingTagId = tagId;
  }

  goToStyles(): void {
    this.currentPanel = 'styles';
    this.editingTagId = null;
  }

  close(): void {
    this.isOpen = false;
  }

  open(): void {
    this.isOpen = true;
    this.goToMain();
  }
}
