import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashBoardPage from "./pages/DashBoardPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import ExpensesPage from "./pages/ExpensesPage";
import ManageTagsModal from "./components/ManageTagsModal"; // Import the modal, not the page!

function App() {
  const [showTagsModal, setShowTagsModal] = useState(false);

  // You can pass setShowTagsModal to Sidebar or ExpensesPage if you want to trigger from there
  return (
    <Router>
      <div className="flex">
        <Sidebar onManageTagsClick={() => setShowTagsModal(true)} />
        <main className="flex-1 m-0 bg-gray-50 min-h-screen pt-10">
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/add" element={<AddTransactionPage />} />
            <Route path="/expenses" element={
              <ExpensesPage onManageTagsClick={() => setShowTagsModal(true)} />
            } />
            {/* Remove the /tags route! */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {/* Render the modal at the root so it overlays everything */}
        <ManageTagsModal isOpen={showTagsModal} onClose={() => setShowTagsModal(false)} />
      </div>
    </Router>
  );
}

export default App;