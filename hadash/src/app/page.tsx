"use client";

import { useState } from "react";
import { HomeAssistantSocket } from "../components/HomeAssistantSocket";
import WidgetGrid from "@/components/WidgetGrid";
import DashboardControls from "@/components/DashboardControls";
import { useWidgetManager } from "@/hooks/useWidgetManager";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const {
    config,
    toggleEditMode,
    updateLayout,
    addWidget,
    removeWidget
  } = useWidgetManager();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Home Assistant Dashboard</h1>
          <p className="text-slate-600">Monitor and control your smart home</p>
        </header>

        <DashboardControls
          isEditMode={config.isEditMode}
          onToggleEdit={toggleEditMode}
          onAddWidget={addWidget}
        />

        <WidgetGrid
          widgets={config.widgets}
          layout={config.layout}
          isEditMode={config.isEditMode}
          expandedCard={expandedCard}
          onLayoutChange={updateLayout}
          onCardExpand={setExpandedCard}
          onCardClose={() => setExpandedCard(null)}
          onRemoveWidget={removeWidget}
        />

        <HomeAssistantSocket />
      </div>
    </div>
  );
}
