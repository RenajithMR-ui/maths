import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { Navbar } from './components/Navbar';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './components/HomePage';
import { ModulePage } from './components/ModulePage';
import { TopicPage } from './components/TopicPage';
import { GraphLppLab } from './components/GraphLppLab';
import { FormulasPage } from './components/FormulasPage';
import { MindMapPage } from './components/MindMapPage';
import { FlashcardsPage } from './components/FlashcardsPage';
import { QuizPage } from './components/QuizPage';
import { PyqPage } from './components/PyqPage';
import { AboutPage } from './components/AboutPage';
import { courseConfig } from './data/courseConfig';

function RouterView() {
  const { hash } = useCourse();
  const route = hash.replace(/^#/, '') || '/';

  if (route === '/' || route === '') {
    return <HomePage />;
  }
  if (route.startsWith('/module/')) {
    return <ModulePage moduleId={route.replace('/module/', '')} />;
  }
  if (route.startsWith('/topic/')) {
    return <TopicPage topicId={route.replace('/topic/', '')} />;
  }
  if (route.startsWith('/graph-lab')) {
    return <GraphLppLab />;
  }
  if (route.startsWith('/formulas')) {
    return <FormulasPage />;
  }
  if (route.startsWith('/mindmap')) {
    return <MindMapPage />;
  }
  if (route.startsWith('/flashcards')) {
    return <FlashcardsPage />;
  }
  if (route.startsWith('/quiz')) {
    return <QuizPage />;
  }
  if (route.startsWith('/pyq')) {
    return <PyqPage />;
  }
  if (route.startsWith('/about')) {
    return <AboutPage />;
  }

  return <HomePage />;
}

function AppShell() {
  return (
    <div className="app-backdrop">
      <Navbar />
      <main style={{ flex: 1 }}>
        <RouterView />
      </main>
      <footer className="site-footer">
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <span>{courseConfig.footer.copyright}</span>
          <span>{courseConfig.footer.note}</span>
        </div>
      </footer>
      <SearchModal />
    </div>
  );
}

export default function App() {
  return (
    <CourseProvider>
      <AppShell />
    </CourseProvider>
  );
}
