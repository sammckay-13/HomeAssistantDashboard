"use client";

import { useState, useCallback } from 'react';
import { Widget, WidgetLayout, DashboardConfig, WIDGET_TYPES } from '@/types/widgets';

const DEFAULT_WIDGETS: Widget[] = [
  {
    id: 'climate-1',
    type: WIDGET_TYPES.CLIMATE,
    title: 'Climate Control',
    value: '72°F',
    subtitle: 'Living Room',
    valueColor: 'text-blue-600'
  },
  {
    id: 'security-1',
    type: WIDGET_TYPES.SECURITY,
    title: 'Security',
    value: 'Armed',
    subtitle: 'All sensors active',
    valueColor: 'text-green-600'
  },
  {
    id: 'lighting-1',
    type: WIDGET_TYPES.LIGHTING,
    title: 'Lighting',
    value: '8 on',
    subtitle: '12 total lights',
    valueColor: 'text-amber-600'
  },
  {
    id: 'energy-1',
    type: WIDGET_TYPES.ENERGY,
    title: 'Energy Usage',
    value: '2.4 kW',
    subtitle: 'Current consumption',
    valueColor: 'text-purple-600'
  },
  {
    id: 'media-1',
    type: WIDGET_TYPES.MEDIA,
    title: 'Media Center',
    value: 'Currently Playing',
    subtitle: 'Living Room TV • Netflix',
    valueColor: 'text-slate-700'
  },
  {
    id: 'doors-1',
    type: WIDGET_TYPES.DOORS_WINDOWS,
    title: 'Doors & Windows',
    value: 'Secure',
    subtitle: 'All closed & locked',
    valueColor: 'text-green-600'
  },
  {
    id: 'weather-1',
    type: WIDGET_TYPES.WEATHER,
    title: 'Weather',
    value: '75°F',
    subtitle: 'Partly cloudy',
    valueColor: 'text-blue-600'
  },
  {
    id: 'activity-1',
    type: WIDGET_TYPES.ACTIVITY,
    title: 'Recent Activity',
    value: '• Motion detected in kitchen\n• Front door unlocked\n• Living room lights dimmed',
    subtitle: '',
    valueColor: 'text-slate-600'
  },
  {
    id: 'garage-1',
    type: WIDGET_TYPES.GARAGE,
    title: 'Garage',
    value: 'Closed',
    subtitle: 'Last opened 2h ago',
    valueColor: 'text-red-600'
  },
  {
    id: 'water-heater-1',
    type: WIDGET_TYPES.WATER_HEATER,
    title: 'Water Heater',
    value: '140°F',
    subtitle: 'Optimal temperature',
    valueColor: 'text-orange-600'
  }
];

const DEFAULT_LAYOUT: WidgetLayout[] = [
  { i: 'climate-1', x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
  { i: 'security-1', x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
  { i: 'lighting-1', x: 2, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
  { i: 'energy-1', x: 3, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
  { i: 'media-1', x: 0, y: 1, w: 2, h: 1, minW: 2, minH: 1 },
  { i: 'doors-1', x: 2, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
  { i: 'weather-1', x: 3, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
  { i: 'activity-1', x: 0, y: 2, w: 2, h: 1, minW: 2, minH: 1 },
  { i: 'garage-1', x: 2, y: 2, w: 1, h: 1, minW: 1, minH: 1 },
  { i: 'water-heater-1', x: 3, y: 2, w: 1, h: 1, minW: 1, minH: 1 }
];

export function useWidgetManager() {
  const [config, setConfig] = useState<DashboardConfig>({
    widgets: DEFAULT_WIDGETS,
    layout: DEFAULT_LAYOUT,
    isEditMode: false
  });

  const toggleEditMode = useCallback(() => {
    setConfig(prev => ({ ...prev, isEditMode: !prev.isEditMode }));
  }, []);

  const updateLayout = useCallback((newLayout: WidgetLayout[]) => {
    setConfig(prev => ({ ...prev, layout: newLayout }));
  }, []);

  const addWidget = useCallback((widget: Omit<Widget, 'id'>) => {
    const id = `${widget.type}-${Date.now()}`;
    const newWidget: Widget = { ...widget, id };
    
    // Find available position
    const maxY = Math.max(...config.layout.map(l => l.y + l.h), 0);
    const newLayoutItem: WidgetLayout = {
      i: id,
      x: 0,
      y: maxY,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1
    };

    setConfig(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget],
      layout: [...prev.layout, newLayoutItem]
    }));
  }, [config.layout]);

  const removeWidget = useCallback((widgetId: string) => {
    setConfig(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId),
      layout: prev.layout.filter(l => l.i !== widgetId)
    }));
  }, []);

  const updateWidget = useCallback((widgetId: string, updates: Partial<Widget>) => {
    setConfig(prev => ({
      ...prev,
      widgets: prev.widgets.map(w => 
        w.id === widgetId ? { ...w, ...updates } : w
      )
    }));
  }, []);

  return {
    config,
    toggleEditMode,
    updateLayout,
    addWidget,
    removeWidget,
    updateWidget
  };
}