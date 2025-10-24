// Fix: Import `ComponentType` from `react` to resolve the "Cannot find namespace 'React'" error.
import type { ComponentType } from 'react';

export type Tool = 
  | 'presets'
  | 'adjust'
  | 'editObject'
  | 'facialMood'
  | 'background'
  | 'upscale'
  | 'prompt';

export interface ToolDefinition {
  id: Tool;
  name: string;
  icon: ComponentType<{ className?: string }>;
}