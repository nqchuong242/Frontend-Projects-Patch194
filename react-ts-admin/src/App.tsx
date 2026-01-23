import './App.css'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import DefaultLayout from './layouts/DefaultLayout';
import DashBoardPage from './modules/dashboard/DashBoardPage';
import NotFoundPage from './modules/notfound/NotFoundPage';
import EmptyLayout from './layouts/EmptyLayout';
import LoginPage from './modules/auth/LoginPage';
import ProductsPage from './modules/products/ProductsPage';
import TablesPage from './modules/tables/TablesPage';
import ReportsPage from './modules/reports/ReportsPage';
import SettingsPage from './modules/settings/SettingsPage';


// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* DEFAULT LAYOUT */}
          <Route path="/" element={<DefaultLayout />} >
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/tables" element={<TablesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              
          </Route>

          {/*NO LAYOUT *
          <Route path="/" element={<EmptyLayout />}>
              <Route path="/login" element={<LoginPage />} />
          </Route> 
          */}

          {/* NOT FOUND */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
