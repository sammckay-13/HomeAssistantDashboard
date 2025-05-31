export interface Widget {
  id: string;
  type: string;
  title: string;
  value: string;
  subtitle: string;
  valueColor?: string;
  config?: Record<string, unknown>;
}

export interface WidgetLayout {
  i: string; // widget id
  x: number;
  y: number;
  w: number; // width in grid units
  h: number; // height in grid units
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface DashboardConfig {
  widgets: Widget[];
  layout: WidgetLayout[];
  isEditMode: boolean;
}

export const WIDGET_TYPES = {
  CLIMATE: 'climate',
  SECURITY: 'security', 
  LIGHTING: 'lighting',
  ENERGY: 'energy',
  MEDIA: 'media',
  DOORS_WINDOWS: 'doors_windows',
  WEATHER: 'weather',
  ACTIVITY: 'activity',
  GARAGE: 'garage',
  WATER_HEATER: 'water_heater'
} as const;

export type WidgetType = typeof WIDGET_TYPES[keyof typeof WIDGET_TYPES];