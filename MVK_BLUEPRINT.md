# 🛡️ VIABHRON MVK: Modular Viable Kernel
## Blueprint & Project Manifest v5.0

### 1. Core Concept
Viabhron is an AI-centric operating system. In this model, agents are the primary users of the computer, while the human (Chairman) acts as a supervisor and ratifier through the **Vaa** client.

### 2. File Structure & Component Breakdown

#### Root Files
- `server.ts`: Full-stack entry point. Handles static serving and API Intercom.
- `package.json`: Dependency manifest and scripts (`npm run dev` for full-stack).
- `metadata.json`: App permissions and identity.
- `tsconfig.json`: TypeScript configuration (includes `reference/` exclusion).

#### `/src` - Frontend Source
- `main.tsx`: React DOM reconciliation.
- `App.tsx`: The **Kernel Orchestrator**. Manages the phase transition from Setup -> Onboarding -> Vaa.
- `types.ts`: Universal type library for agents, messages, and state.
- `index.css`: **Celestial Theme** definitions and Tailwind v4 configuration.

#### `/src/components` - UI Layers
- **`/Setup`**: Infrastructure provisioning.
  - `SetupBox.tsx`: Google Cloud project discovery and Firebase "bridge" initialization.
  - `Onboarding.tsx`: Intent mapping and hardware profile selection post-setup.
- **`/Vaa`**: The primary OS window.
  - `VaaClient.tsx`: Main chat-based shell.
  - `ChatList.tsx`: Directory of resident and sub-agents.
  - `ChatView.tsx`: Interactive command line for agent dialogue.

#### `/src/lib` - Core Logic
- `firebase.ts`: Database and Auth initialization.
- `infraManager.ts`: Dynamic GCP/Firebase connector for user-owned backends.

#### `/src/hooks` - System Hooks
- `useAuth.ts`: Identity state management.

#### `/reference` - Modular Assets
- Contains read-only reference code for features not yet fully migrated into the MVK. Avoid modifying logic here; use as a blueprint for the active `src/` directory.

---

### 3. Development Bypass Protocol (Ratification Skip)
To accelerate development while maintaining high security, a **Development Bypass** is implemented.

#### Strategy
- **Environment Gating**: Logic is strictly wrapped in `import.meta.env.DEV`.
- **Mock Identity**: When in `DEV`, the kernel assumes a `system-admin` session, skipping the Google OAuth requirement.
- **State Forcing**: The setup and onboarding hurdles are automatically cleared in development mode.

#### Security Invariant
> "While this makes development significantly faster, it introduces the risk of accidentally leaving a backdoor in the code. To mitigate this, the bypass logic must be strictly wrapped in environment checks that are stripped out during the `npm run build` process, ensuring that the final production app always requires the Chairman's real ratification."

**Status:** Implementation complete as of turn 5.
