# Personal Expense Tracker
A minimalist and visually elegant expense tracker designed for clarity and ease of use.
[cloudflarebutton]
Personal Expense Tracker is a visually stunning, minimalist expense tracker designed to make financial tracking an effortless and delightful experience. Built on Cloudflare's edge network, it offers a lightning-fast, single-page interface for adding, viewing, and analyzing expenses.
## Key Features
- **Minimalist Dashboard**: A clean, at-a-glance summary of your financial activity.
- **Effortless Expense Entry**: Quickly add new expenses through an intuitive dialog form.
- **Visual Spending Insights**: An elegant chart visualizes your spending by category.
- **Real-time Transaction List**: Instantly see your latest expenses as they are added.
- **Blazing Fast**: Built on Cloudflare Workers and Durable Objects for exceptional performance.
- **Visually Polished**: A beautiful, modern UI with smooth animations and a focus on user experience.
## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod for validation
- **Animation**: Framer Motion
- **Backend**: Hono on Cloudflare Workers
- **Storage**: Cloudflare Durable Objects
- **Language**: TypeScript
## Getting Started
Follow these instructions to get a local copy up and running for development and testing purposes.
### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
### Installation
1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd zenith_ledger
    ```
2.  **Install dependencies:**
    ```sh
    bun install
    ```
3.  **Run the development server:**
    The application will be available at `http://localhost:3000`.
    ```sh
    bun run dev
    ```
## Project Structure
- `src/`: Contains the frontend React application source code.
  - `pages/`: Main application views.
  - `components/`: Reusable React components.
  - `lib/`: Utilities, API client, and state management store.
- `worker/`: Contains the Hono backend application for Cloudflare Workers.
  - `user-routes.ts`: API endpoint definitions.
  - `entities.ts`: Durable Object entity definitions.
- `shared/`: TypeScript types shared between the frontend and backend.
## Development
The development server provides hot-reloading for both the frontend and the backend worker.
- **Frontend Development**: Modify files within the `src` directory. Changes will be reflected instantly in your browser.
- **Backend Development**: API routes are defined in `worker/user-routes.ts`. The development server will automatically restart the worker on changes.
- **Shared Types**: To maintain type safety between the client and server, define shared data structures in `shared/types.ts`.
## Available Scripts
- `bun run dev`: Starts the local development server.
- `bun run build`: Builds the frontend application and worker for production.
- `bun run deploy`: Deploys the application to Cloudflare Workers.
- `bun run lint`: Lints the codebase.
## Deployment
This project is configured for seamless deployment to Cloudflare.
1.  **Log in to Wrangler:**
    Ensure you are authenticated with your Cloudflare account.
    ```sh
    wrangler login
    ```
2.  **Deploy the application:**
    This command will build and deploy your application to your Cloudflare account.
    ```sh
    bun run deploy
    ```
Alternatively, you can deploy directly from your GitHub repository using the button below.
[cloudflarebutton]
---
Built with Love ❤️ by Viraj Shah