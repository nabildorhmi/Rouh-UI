import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Agency } from "./pages/Agency";
import { Podcast } from "./pages/Podcast";
import { Contact } from "./pages/Contact";
import { DevDesignPreview } from "./pages/DevDesignPreview";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dev/design-preview" element={<DevDesignPreview />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
