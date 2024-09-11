import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundaries from "./utils/ErrorBoundaries";
import Layout from "./layout/Layout";

function App(): JSX.Element {
  return (
    <>
      <ErrorBoundaries>
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter>
              <Layout>
                <AppRoutes />
              </Layout>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundaries>
    </>
  );
}

export default App;
