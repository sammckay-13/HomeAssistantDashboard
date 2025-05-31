"use client";

import { useState } from 'react';
import { MdEdit, MdSave, MdAdd, MdSettings } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { Widget, WIDGET_TYPES } from '@/types/widgets';

interface DashboardControlsProps {
  isEditMode: boolean;
  onToggleEdit: () => void;
  onAddWidget: (widget: Omit<Widget, 'id'>) => void;
}

const WIDGET_TEMPLATES = {
  [WIDGET_TYPES.CLIMATE]: {
    title: 'Climate Control',
    value: '72°F',
    subtitle: 'Room Temperature',
    valueColor: 'text-blue-600'
  },
  [WIDGET_TYPES.SECURITY]: {
    title: 'Security System',
    value: 'Armed',
    subtitle: 'All sensors active',
    valueColor: 'text-green-600'
  },
  [WIDGET_TYPES.LIGHTING]: {
    title: 'Lighting',
    value: '8 on',
    subtitle: '12 total lights',
    valueColor: 'text-amber-600'
  },
  [WIDGET_TYPES.ENERGY]: {
    title: 'Energy Monitor',
    value: '2.4 kW',
    subtitle: 'Current consumption',
    valueColor: 'text-purple-600'
  },
  [WIDGET_TYPES.MEDIA]: {
    title: 'Media Center',
    value: 'Idle',
    subtitle: 'No active playback',
    valueColor: 'text-slate-700'
  },
  [WIDGET_TYPES.DOORS_WINDOWS]: {
    title: 'Doors & Windows',
    value: 'Secure',
    subtitle: 'All closed & locked',
    valueColor: 'text-green-600'
  },
  [WIDGET_TYPES.WEATHER]: {
    title: 'Weather',
    value: '75°F',
    subtitle: 'Partly cloudy',
    valueColor: 'text-blue-600'
  },
  [WIDGET_TYPES.GARAGE]: {
    title: 'Garage Door',
    value: 'Closed',
    subtitle: 'Last opened 2h ago',
    valueColor: 'text-red-600'
  }
};

export default function DashboardControls({
  isEditMode,
  onToggleEdit,
  onAddWidget
}: DashboardControlsProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleAddWidget = (type: string) => {
    const template = WIDGET_TEMPLATES[type as keyof typeof WIDGET_TEMPLATES];
    if (template) {
      onAddWidget({
        type,
        ...template
      });
    }
    setShowAddMenu(false);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        onClick={onToggleEdit}
        variant={isEditMode ? "default" : "outline"}
        className={`flex items-center gap-2 ${isEditMode ? 'bg-red-500 hover:bg-red-600 text-white' : 'border-red-500 text-red-500 hover:bg-red-50'}`}
      >
        {isEditMode ? (
          <>
            <MdSave className="text-lg" />
            Save Layout
          </>
        ) : (
          <>
            <MdEdit className="text-lg" />
            Edit Dashboard
          </>
        )}
      </Button>

      {isEditMode && (
        <div className="relative">
          <Button
            onClick={() => setShowAddMenu(!showAddMenu)}
            variant="outline"
            className="flex items-center gap-2 border-green-500 text-green-500 hover:bg-green-50"
          >
            <MdAdd className="text-lg" />
            Add Widget
          </Button>

          {showAddMenu && (
            <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-48">
              <div className="p-2">
                <div className="text-sm font-medium text-slate-700 px-3 py-2 border-b">
                  Choose Widget Type
                </div>
                {Object.entries(WIDGET_TEMPLATES).map(([type, template]) => (
                  <button
                    key={type}
                    onClick={() => handleAddWidget(type)}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded text-sm transition-colors"
                  >
                    <div className="font-medium">{template.title}</div>
                    <div className="text-xs text-slate-500">{template.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex-1" />

      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <MdSettings className="text-lg" />
        Settings
      </Button>
    </div>
  );
}