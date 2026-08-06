import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Projects from './pages/Projects';
import InterviewQuestions from './pages/InterviewQuestions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Projects />} />
          <Route path="interviews" element={<InterviewQuestions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
