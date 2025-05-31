"use client";

import { Responsive, WidthProvider } from 'react-grid-layout';
import { Widget, WidgetLayout } from '@/types/widgets';
import CustomCard from './CustomCard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface WidgetGridProps {
  widgets: Widget[];
  layout: WidgetLayout[];
  isEditMode: boolean;
  expandedCard: string | null;
  onLayoutChange: (layout: WidgetLayout[]) => void;
  onCardExpand: (widgetId: string) => void;
  onCardClose: () => void;
  onRemoveWidget: (widgetId: string) => void;
}

export default function WidgetGrid({
  widgets,
  layout,
  isEditMode,
  expandedCard,
  onLayoutChange,
  onCardExpand,
  onCardClose,
  onRemoveWidget
}: WidgetGridProps) {
  const layouts = {
    lg: layout,
    md: layout,
    sm: layout.map(l => ({ ...l, w: Math.min(l.w, 2) })),
    xs: layout.map(l => ({ ...l, w: 1 })),
    xxs: layout.map(l => ({ ...l, w: 1 }))
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
      rowHeight={200}
      onLayoutChange={(currentLayout, allLayouts) => {
        if (isEditMode) {
          // Convert back to our WidgetLayout format
          const newLayout: WidgetLayout[] = currentLayout.map(item => ({
            i: item.i,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            minW: item.minW,
            minH: item.minH,
            maxW: item.maxW,
            maxH: item.maxH
          }));
          onLayoutChange(newLayout);
        }
      }}
      isDraggable={isEditMode}
      isResizable={isEditMode}
      margin={[24, 24]}
      containerPadding={[0, 0]}
      useCSSTransforms={true}
      compactType="vertical"
      preventCollision={false}
    >
      {widgets.map((widget) => (
        <div key={widget.id} className="widget-container">
          <CustomCard
            id={widget.id}
            title={widget.title}
            value={widget.value}
            subtitle={widget.subtitle}
            valueColor={widget.valueColor}
            isExpanded={expandedCard === widget.id}
            onExpand={() => onCardExpand(widget.id)}
            onClose={onCardClose}
            onRemove={() => onRemoveWidget(widget.id)}
            isEditMode={isEditMode}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}