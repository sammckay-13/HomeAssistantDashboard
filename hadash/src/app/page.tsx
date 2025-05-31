"use client";

import { useState } from "react";
import { HomeAssistantSocket } from "../components/HomeAssistantSocket";
import CustomCard from "@/components/CustomCard";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const cardData = [
    {
      title: "Climate Control",
      value: "72°F",
      subtitle: "Living Room",
      valueColor: "text-blue-600",
      colSpan: "col-span-1"
    },
    {
      title: "Security",
      value: "Armed",
      subtitle: "All sensors active",
      valueColor: "text-green-600",
      colSpan: "col-span-1"
    },
    {
      title: "Lighting",
      value: "8 on",
      subtitle: "12 total lights",
      valueColor: "text-amber-600",
      colSpan: "col-span-1"
    },
    {
      title: "Energy Usage",
      value: "2.4 kW",
      subtitle: "Current consumption",
      valueColor: "text-purple-600",
      colSpan: "col-span-1"
    },
    {
      title: "Media Center",
      value: "Currently Playing",
      subtitle: "Living Room TV • Netflix",
      valueColor: "text-slate-700",
      colSpan: "col-span-1 md:col-span-2"
    },
    {
      title: "Doors & Windows",
      value: "Secure",
      subtitle: "All closed & locked",
      valueColor: "text-green-600",
      colSpan: "col-span-1"
    },
    {
      title: "Weather",
      value: "75°F",
      subtitle: "Partly cloudy",
      valueColor: "text-blue-600",
      colSpan: "col-span-1"
    },
    {
      title: "Recent Activity",
      value: "• Motion detected in kitchen\n• Front door unlocked\n• Living room lights dimmed",
      subtitle: "",
      valueColor: "text-slate-600",
      colSpan: "col-span-1 lg:col-span-2"
    },
    {
      title: "Garage",
      value: "Closed",
      subtitle: "Last opened 2h ago",
      valueColor: "text-red-600",
      colSpan: "col-span-1"
    },
    {
      title: "Water Heater",
      value: "140°F",
      subtitle: "Optimal temperature",
      valueColor: "text-orange-600",
      colSpan: "col-span-1"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Home Assistant Dashboard</h1>
          <p className="text-slate-600">Monitor and control your smart home</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardData.map((card) => (
            <CustomCard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              valueColor={card.valueColor}
              colSpan={card.colSpan}
              isExpanded={expandedCard === card.title}
              onExpand={() => setExpandedCard(card.title)}
              onClose={() => setExpandedCard(null)}
            />
          ))}
        </div>
        <HomeAssistantSocket />
      </div>
    </div>
  );
}
