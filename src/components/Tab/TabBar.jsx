import { memo } from "react";
import { tabSwitcherClasses } from "./TabBar.config";

/**
 * TabSwitcher component
 *
 * @param {Array<string | { id: string, name: string }>} tabs - Tab list
 * @param {string} activeTab - Currently active tab key
 * @param {function} onChange - Function to change active tab
 */
function TabSwitcher({ tabs = [], activeTab, onChange }) {
    const normalizeTab = (tab) =>
        typeof tab === "string"
            ? { key: tab, label: tab }
            : { key: tab.id || tab.key, label: tab.name || tab.label };

    return (
        <div className={tabSwitcherClasses.container}>
            {tabs.map((tabItem) => {
                const tab = normalizeTab(tabItem);
                const isActive = tab.key === activeTab;

                return (
                    <button
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className={`${tabSwitcherClasses.tabButton} ${isActive ? tabSwitcherClasses.activeText : tabSwitcherClasses.inactiveText
                            }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

export default memo(TabSwitcher);
