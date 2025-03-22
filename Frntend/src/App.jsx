import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import Edit from "./Pages/edit";
import Create from "./Pages/Create";
import BlogDetail from "./Pages/BlogDetails";
import Layout from "./components/layout";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/blog/:_id"
            element={
              <Layout>
                <BlogDetail />
              </Layout>
            }
          />

          <Route path="/*" element={<ErrorPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:_id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
