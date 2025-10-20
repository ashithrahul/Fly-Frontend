## Tech Stack

- **Frontend**: React + Vite
- **Styling**: CSS Modules with responsive design
- **State Management**: RTK
- **Routing**: React Router DOM
- **API Client**: Fetch API with custom utilities
- **Testing**: Jest + React Testing Library
- **Bundler**: Vite

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashithrahul/Fly-Frontend.git
   cd Fly-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## Environment Configuration

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:1001/api

```

## Docker Deployment

### Build Docker Image

```bash
# Build with production API URL
docker build --build-arg VITE_API_URL="https://your-api.com/api" -t fly-frontend .



OR use buildx for diffrenent plateform images if the instance is diffrent



docker buildx build --platform linux/amd64,linux/arm64 \
  --build-arg VITE_API_URL=http://your-api.com/api \
  -t fly-frontend:latest --push .


# Run container
docker run -d -p 80:80 fly-frontend
```
