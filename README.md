# KSA Thruster Placement Tool (TPT)

<div align="center">

![Version](https://img.shields.io/badge/version-0.0.0-blue.svg)![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)![Three.js](https://img.shields.io/badge/Three.js-0.181.1-000000?logo=three.js)![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)

**3D editor for spacecraft thruster placement and configuration**

[Live Demo](https://MrAndroPC.github.io/KSA-TPT/) • [Report Bug](https://github.com/MrAndroPC/KSA-TPT/issues) • [Request Feature](https://github.com/MrAndroPC/KSA-TPT/issues)

</div>



## Overview

**KSA-TPT** is a web-based 3D editor designed for in the KSA (Kitten Space Agency) Pre-Alpha. It provides a visual interface for placing, orienting, and configuring RCS thrusters on 3D models, then exporting their configuration to KSA-compatible XML format.

### Key Capabilities

- **Visual 3D Editing** - Interactive placement and rotation of thrusters with real-time visual feedback
- **GLB Model Support** - Import and visualize your spacecraft models in glTF binary format
- **Precision Controls** - Fine-tune thruster positions and directions with numerical inputs
- **Thruster Configuration** - Set thrust values, specific impulse, and other physical parameters
- **Transform Modes** - Switch between translate and rotate modes with keyboard shortcuts (T/R)
- **XML Export** - Generate game-ready XML configuration files

---

## Features

### 3D Viewport
- **Interactive 3D canvas** powered by Three.js and React Three Fiber
- **Orbit controls** with smooth damping for easy navigation
- **Axis-aligned views** - Snap to front, back, left, right, top, or bottom views
- **Grid and axis helpers** for spatial reference
- **Real-time gizmo visualization** showing thruster positions and exhaust directions

### Thruster Management
- **Add/Remove thrusters** with instant visual feedback
- **Duplicate thrusters** to speed up symmetric configurations
- **Visual gizmos** - Orange spheres with yellow directional cones
- **Transform controls** - Interactive translate and rotate gizmos
- **Properties panel** with comprehensive parameter editing

### Editing Tools
- **Position editing** - X, Y, Z coordinates with 0.001m precision
- **Direction editing** - Exhaust vector control with visual feedback
- **Transform modes** - Translate (T) and Rotate (R) with keyboard shortcuts
- **Snap-to-axis views** - Quick orthogonal camera positioning
- **Reset rotation** - One-click return to default orientation

### Export & Integration
- 📋 **One-click XML export** to clipboard
- 🎮 **Game-compatible format** with proper coordinate mapping
- ⚙️ **Full parameter support** including:
  - Thrust (Newtons)
  - Specific Impulse (seconds)
  - Minimum pulse time
  - Control mappings
  - Volumetric exhaust effects
  - Sound events

---


## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **pnpm** / **yarn**)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrAndroPC/KSA-TPT.git
   cd KSA-TPT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## Usage Guide

### Basic Workflow

1. **Import a Model**
   - Drag and drop a `.glb` file into the import zone, or click to browse
   - Your 3D model will appear in the viewport

2. **Add Thrusters**
   - Click the "**+ Add**" button to create a new thruster
   - The thruster appears at the origin with default properties

3. **Position Thrusters**
   - Select a thruster from the list
   - Press **T** for translate mode or **R** for rotate mode
   - Use the 3D gizmo to move and rotate the thruster
   - Or manually enter coordinates in the properties panel

4. **Configure Properties**
   - Set the thruster ID and control mapping (e.g., "TranslateRight")
   - Adjust thrust, specific impulse, and pulse time
   - Configure visual effects and sound events

5. **Export Configuration**
   - Click "**Copy XML**" to copy the configuration to clipboard
   - Paste into your game's configuration file

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **T** | Switch to Translate mode |
| **R** | Switch to Rotate mode |
| **Click Axis Gizmo** | Snap to orthogonal view |
| **Click Axis Again** | Flip to opposite view |

### Coordinate System

- **X-axis (Red)** - Front/Back (Game forward is +X)
- **Y-axis (Green)** - Right/Left
- **Z-axis (Blue)** - Up/Down

**Exhaust Direction:** The yellow cone shows the exhaust direction. For a thruster to push the spacecraft forward, the exhaust should point backward (toward -X by default).

---

## Technical Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework |
| **TypeScript** | 5.9.3 | Type safety |
| **Vite** | 7.2.2 | Build tool & dev server |
| **Three.js** | 0.181.1 | 3D rendering engine |
| **React Three Fiber** | 9.4.0 | React renderer for Three.js |
| **@react-three/drei** | 10.7.7 | Three.js helpers & controls |
| **Zustand** | 5.0.8 | State management |
| **fast-xml-parser** | 5.3.2 | XML serialization |

### Development Tools

- **ESLint** - Code linting with TypeScript support
- **gh-pages** - Automated GitHub Pages deployment

---

## Project Structure

```
KSA-TPT/
├── public/               # Static assets
│   └── vite.svg
├── src/
│   ├── assets/          # Images and icons
│   │   └── react.svg
│   ├── components/      # React components
│   │   ├── AxisGizmo.tsx           # Axis view controller
│   │   ├── ExportXmlPanel.tsx      # XML export interface
│   │   ├── ImportDropZone.tsx      # Model import
│   │   ├── LoadedModel.tsx         # 3D model renderer
│   │   ├── ModelInfoPanel.tsx      # Model information display
│   │   ├── SceneRoot.tsx           # Main 3D scene
│   │   ├── ThrusterGizmo.tsx       # Individual thruster visualization
│   │   ├── ThrusterListPanel.tsx   # Thruster list UI
│   │   ├── ThrusterPropertiesForm.tsx  # Properties editor
│   │   ├── ThrustersGizmos.tsx     # All thrusters renderer
│   │   ├── TransformModeToolbar.tsx    # Mode switcher
│   │   └── ViewportCanvas.tsx      # 3D viewport container
│   ├── lib/             # Core logic
│   │   ├── thrusterSchema.ts       # Data models
│   │   └── xmlSerializer.ts        # XML export logic
│   ├── state/           # State management
│   │   ├── editorStore.ts          # Editor state (modes, views)
│   │   ├── modelStore.ts           # 3D model state
│   │   └── thrustersStore.ts       # Thrusters data
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Application entry
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

---


### TypeScript Configuration

Strict type checking is enabled for maximum code quality. See [`tsconfig.json`](tsconfig.json) and [`tsconfig.app.json`](tsconfig.app.json).

### ESLint Configuration

Modern flat config format with React and TypeScript rules. See [`eslint.config.js`](eslint.config.js).

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for all new code
- Test your changes thoroughly
- Update documentation as needed

---

## Known Issues

- Y and Z coordinates are intentionally swapped in some places in code
- Large models are loading quite a long time
- You can't move your cursor when you trying to enter orthgrapic view
---


## 🙏 Acknowledgments

- **Three.js** community for the excellent 3D library
- **React Three Fiber** for the React integration
- **KSA community** for inspiration and testing

---

**Project Link:** [https://github.com/MrAndroPC/KSA-TPT](https://github.com/MrAndroPC/KSA-TPT)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for the KSA Modding Community

</div>
