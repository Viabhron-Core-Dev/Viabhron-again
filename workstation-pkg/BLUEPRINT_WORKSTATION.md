# 🏗️ Blueprint: Viabhron Workstation Core (Expert Mode)

This package contains the core components and logic for the **Viabhron Expert Mode** (Workstation/VAA UI). It is designed to be a self-contained "Shell" that can be exported or migrated to external environments (like MVK).

---

## 📁 Package Structure

- **`/SovereignShell.tsx`**: The main orchestrator. Handles state for menus, workstation/desktop transitions, and focus mode.
- **`/components/DesktopStage.tsx`**: The 'Home' or 'Launchpad' stage. Displays shortcuts and atmospheric backgrounds.
- **`/components/WorkstationStage.tsx`**: The 'Workbench' for active modules. Provides window chrome (minimize, maximize, close) and sub-navigation.
- **`/components/TaskBar.tsx`**: The bottom persistent navigator ("Sovereign Strip"). Manages app switching and system tray access.
- **`/components/CanopyMenu.tsx`**: The advanced system menu. Implements the **Gamma Taxonomy** (Kernel, Forge, Landscape, etc.).
- **`/components/SystemTrayMenu.tsx`**: The 'System Hub'. Includes the Task Manager (Active Processes) and Pulse Monitor (Metrics).
- **`/components/common/GlassPanel.tsx`**: The visual atomic unit. Implements the obsidian/glass aesthetic guidelines.
- **`/hooks/useTabs.ts`**: The state engine. Handles tab lifecycle, Firebase persistence, and process shelving.
- **`/types.ts`**: The data definitions required for the shell to function.

---

## 🛠️ How it Fits into Viabhron VAA

The Workstation is triggered when the `UIMode` is set to `'vaa'`. Unlike the browser-like `CelestialShell`, the `SovereignShell` operates on a **Single-Window Workbench** model:

1.  **Desktop Layer**: Where discovery and high-level selection happen.
2.  **Workstation Layer**: Where specific "Spores" (tabs) are "Inflated" into modules.
3.  **Command Layer**: Overhead overlays (Canopy/Hub) for kernel-level management.

### Key Logic Flow
- All navigation events go through `useTabs.ts`.
- `SovereignShell` listens to the `activeTabId`. 
- If `activeTabId` is `null`, it renders `DesktopStage`.
- If `activeTabId` is present, it renders `WorkstationStage` around the module content.

---

## 🚀 Export & Integration (MVK Readiness)

To integrate this package into an external React project:

1.  **Dependencies**: Ensure `motion/react`, `lucide-react`, and `tailwind-merge` are installed.
2.  **Styling**: The package assumes Tailwind CSS is configured and `GlassPanel` variables are available.
3.  **Context**: Provide a `user` and `extensions` array to the `useTabs` hook.
4.  **Registration**: Map the `TabType` to your local components in the `renderModule` prop of `SovereignShell`.

---

## 🔒 Security Compliance
- **Identity-8004**: Integrated into the Canopy Landscape.
- **Bulkhead Patches**: Controlled via the Canopy Compliance section.
- **Isolation**: Workstation components expect a "Zero-Trust" environment where each module is passed as a child.

---
*Blueprint generated on 2026-04-20 for Viabhron Core Dev.*
