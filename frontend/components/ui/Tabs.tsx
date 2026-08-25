"use client";

import { type ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-terracotta text-charcoal"
                : "border-transparent text-muted hover:text-charcoal hover:border-warm-gray"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-6">{activeContent}</div>
    </div>
  );
}

export { Tabs, type TabsProps, type Tab };
