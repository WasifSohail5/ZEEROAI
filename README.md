# Zero AI

This project contains a Next.js frontend and a Python backend.

## Project Structure

- **Frontend (`/`)**: A Next.js 14 application providing the user interface.
- **Backend (`/backend`)**: A Python-based server handling backend tasks, potentially AI model inference.

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend)

### Frontend Setup

```bash
# Install dependencies
npm install
# or
pnpm install

# Run the development server
npm run dev
# or 
pnpm run dev
```

### Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Install requirements
pip install -r requirement.txt

# Run the backend
python main.py
```

## Environment Variables

Make sure to create `.env` files in both the root directory (for frontend) and the `backend` directory (for backend secrets) if needed. These files are ignored by git.
