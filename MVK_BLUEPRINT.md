# 🛡️ VIABHRON MVK: Modular Viable Kernel
## Blueprint & Project Manifest v6.0

### 1. Core Concept
Viabhron is an AI-centric operating system. In this model, agents are the primary users of the computer, while the human (Chairman) acts as a supervisor and ratifier through the **Vaa** client. The MVK is designed to be hardware-aware, supporting native deployment via PWA or APK substrates.

### 2. File Structure & Component Breakdown

#### Root Configuration
- `server.ts`: Full-stack entry point. Handles static serving and API Intercom.
- `package.json`: Dependency manifest including PWA and Capacitor bridges.
- `vite.config.ts`: Configured with the **Vite PWA Plugin** for manifest management and 4MB Workbox precaching.
- `capacitor.config.ts`: Native Android substrate definition for APK generation.
- `metadata.json`: App permissions (Camera/Mic) and identity.

#### `/src` - Frontend Source
- `App.tsx`: The **Kernel Orchestrator**. Manages the phase transition from Setup -> Onboarding -> Vaa.
- `index.css`: **Celestial Theme** + Tailwind v4. Includes Mobile Safe-Area utilities (`pt-safe`, `pb-safe`) and touch-ergonomic resets.

#### `/src/components` - UI Layers
- **`/Vaa`**: The primary OS window.
  - `VaaClient.tsx`: Main chat-based shell. Includes **History API** integration for physical back-button synchronization.
  - `VaaSettings.tsx`: System control panel. Includes **Sovereign Deployment** status (Native vs Web) and the **System Purge** gate.
- **`/Moss`**: The Application Substrate.
  - `MossLoader.tsx`: Manages the "Hatching" of mini-apps. Listens for global kernels events like `close-all-moss`.
  - `SubstrateFrame.tsx`: The sandboxed execution container. Features the **Ω Executive Glyph** for direct neural chat (PIP).

#### `/src/lib` & `/src/hooks`
- `firebase.ts`: Database and Auth initialization.
- `useDualMode.ts`: The **Hardware Bridge**. Detects platform (Native vs Web), themes the Android status bar, and enables native haptics.
- `useAuth.ts`: Identity state management.

---

### 3. Deployment & Execution Protocols

#### Dual-Mode Strategy (PWA + APK)
The Vaa client is architected to be "Triple-Threat" compatible:
1.  **Web Preview**: Standard development and share link environment.
2.  **PWA**: Installable via browser with offline Service Worker support and home-screen "Zero-Tap" ignition.
3.  **APK**: Native Android wrapper using Capacitor, supporting hardware back buttons and persistent system notifications.

#### Sovereign Back-Button Loop
Using the `popstate` listener combined with local `pushState` anchoring, the Vaa client maps the physical Android back button to a priority-based UI reversal system (closing overlays -> closing apps -> backing out of chats).

#### System Purge Protocol
A high-security "Danger Zone" utility that wipes all `viabhron`-prefixed LocalStorage keys and force-reloads the kernel. This allows for immediate factory-reset testing of the "First-Hatch" onboarding flow.

**Status:** Implementation of v6.0 core complete as of turn 43.
