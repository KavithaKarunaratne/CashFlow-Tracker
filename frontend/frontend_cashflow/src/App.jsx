import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashBoardPage from "./pages/DashBoardPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import ExpensesPage from "./pages/ExpensesPage";
import ManageTagsPage from "./pages/ManageTagsPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-56 bg-gray-50 min-h-screen p-8">
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/add" element={<AddTransactionPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/tags" element={<ManageTagsPage />} />
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;