# Overview

This is a 3D Tetris game built with React Three Fiber, featuring a modern web interface with a Node.js/Express backend. The project implements a three-dimensional version of the classic Tetris game where pieces can move and rotate in 3D space within a translucent game field. The application uses a full-stack architecture with TypeScript, modern React patterns with Zustand for state management, and a comprehensive UI component library built on Radix UI primitives.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **3D Graphics**: React Three Fiber (@react-three/fiber) for WebGL rendering with Three.js
- **State Management**: Zustand with subscribeWithSelector middleware for game state, audio control, and UI state
- **UI Components**: Comprehensive component library using Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with CSS custom properties for theming and design system
- **Input Handling**: @react-three/drei KeyboardControls for game input mapping

## Backend Architecture
- **Server**: Express.js with TypeScript running in ESM mode
- **Development**: Custom Vite integration for hot module replacement and development server
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and database implementation for production
- **API Structure**: RESTful API design with /api prefix for all endpoints

## Game Architecture
- **3D Game Field**: 10x20x10 grid with transparent wall boundaries using Three.js materials
- **Piece System**: 7 classic Tetromino types (I, O, T, S, Z, J, L) with 3D movement and rotation capabilities
- **Game Logic**: Collision detection, line clearing, gravity simulation, and scoring system
- **Camera System**: Dual camera modes (free orbit controls and fixed position) with 'V' key toggle
- **Audio System**: Background music, sound effects, and mute functionality

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver (@neondatabase/serverless)
- **ORM**: Drizzle with migration support and type-safe schema definitions
- **Schema**: User authentication system with username/password fields
- **Development Storage**: In-memory storage implementation for rapid development

## State Management
- **Game State**: Zustand stores for Tetris game logic (pieces, field, scoring, game phases)
- **Audio State**: Separate audio store for sound management and mute controls
- **UI State**: Component-level state for interface elements and game HUD
- **Persistence**: Local storage utilities for settings and preferences

# External Dependencies

## Database & Backend Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Database URL**: Environment-based configuration for database connections

## Frontend Libraries
- **React Three Ecosystem**: 
  - @react-three/fiber for React-Three.js integration
  - @react-three/drei for 3D utilities and controls
  - @react-three/postprocessing for visual effects
- **UI Component Library**: Complete Radix UI suite for accessible, unstyled primitives
- **State Management**: Zustand for lightweight, scalable state management
- **Build Tools**: Vite with React plugin, TypeScript support, and GLSL shader loading
- **Styling**: Tailwind CSS with custom configuration and design tokens

## Development Tools
- **Type Safety**: TypeScript with strict configuration across client, server, and shared code
- **Database Tooling**: Drizzle Kit for migrations and schema management
- **Development Experience**: Custom Vite plugin for runtime error overlays in Replit environment
- **Asset Support**: Extended asset handling for 3D models (.gltf, .glb) and audio files (.mp3, .ogg, .wav)

## Audio Assets
- Background music, hit sounds, and success sounds loaded from /sounds/ directory
- HTML5 Audio API for sound playback with volume control and looping support