import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Landing } from './components/landing/Landing';
import { Analyzer } from './components/Analyzer';
import { ScrollToTop } from './components/landing/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/analyze" element={<Analyzer />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
