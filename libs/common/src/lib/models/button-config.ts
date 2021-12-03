export interface ButtonConfig {
  label: string;
  class?: string;
  callback: () => void;
  slot?: 'start' | 'center' | 'end';
  color?: string;
  fill?: string;
}
