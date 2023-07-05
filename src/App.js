import { Routes, Route } from "react-router-dom"
import { ImageGallery } from "./components/ImageGallery"
import { Navbar } from "./components/Navbar"
import { UserForm } from "./components/UserForm"
import { ScrollToTop } from "./components/ScrollToTop"
import { Layout } from "./components/Layout"

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <ImageGallery />
            </Layout>
          }
        />
        <Route
          path="/form"
          element={
            <Layout>
              <UserForm />
            </Layout>
          }
        />
      </Routes>
    </>
  )
}

export default App
