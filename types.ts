
export interface SearchResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export interface ImageEditResult {
  imageUrl: string;
  description: string;
}

export enum AppState {
  LOCKED = 'LOCKED',
  DASHBOARD = 'DASHBOARD'
}
