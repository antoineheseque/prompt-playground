# Prompt Playground

A full-stack AI chat application built with Angular and NestJS.

## Features

- 💬 Chat interface with AI assistant (ClovisLLM)
- ⚙️ Configurable parameters (temperature, max tokens, response format)
- 🎨 Modern UI with DaisyUI and Tailwind CSS
- � API documentation with Swagger

## Quick Start

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd prompt-playground
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```bash
   CLOVIS_API_URL=https://your-api-url.com/v1
   CLOVIS_API_KEY=your-api-key-here
   ```

3. **Start the app**

   ```bash
   npx nx serve frontend
   ```

   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000
   - API Docs: http://localhost:3000/api/docs

## Tech Stack

- **Frontend:** Angular 20, DaisyUI, Tailwind CSS
- **Backend:** NestJS 11, OpenAI SDK, Swagger
- **Monorepo:** Nx workspace

## Project Structure

```
apps/
├── frontend/          # Angular app
│   └── src/app/
│       ├── core/      # Services and models
│       └── features/  # Chat components
└── backend/           # NestJS API
    └── src/
        ├── chat/      # Chat module
        └── common/    # Errors and filters
libs/
└── types/             # Shared DTOs
```
