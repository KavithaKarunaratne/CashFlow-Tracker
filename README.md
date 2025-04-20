# CashFlow Tracker

CashFlow Tracker is a full-stack web application that helps you track your income and expenses, categorize transactions, and visualize your financial data. It features a modern React frontend and a Django backend API.

## Features
- Add, edit, and delete income and expense transactions
- Categorize transactions with tags
- Filter and search transactions
- Dashboard with financial summaries and charts
- Responsive, user-friendly UI

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, React Router, React Icons
- **Backend:** Django (Django REST Framework)

## Project Structure
```
CashFlow-Tracker/
├── backend/            # Django backend
│   └── backend_cashflow/
│       └── manage.py
├── frontend/           # React frontend
│   └── frontend_cashflow/
│       └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend)
- pip (Python package manager)

### Backend Setup (Django)
1. Navigate to the backend directory:
   ```bash
   cd backend/backend_cashflow
   ```
2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install Django and Django REST Framework:
   ```bash
   pip install django djangorestframework
   ```
4. Run migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup (React)
1. Navigate to the frontend directory:
   ```bash
   cd frontend/frontend_cashflow
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Accessing the Application
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000/api/](http://localhost:8000/api/)

## Usage
- Add, edit, or delete transactions
- Use filters and tags to organize your finances
- View dashboards for insights

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.
