export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  iconSrc?: string;
  description: string;
  color: string;
}

export interface InteractionData {
  id: string;
  type: 'app_open' | 'button_click' | 'navigation' | 'icon_click';
  elementText: string;
  appContext: string;
}

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
