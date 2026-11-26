import React, { createContext, useContext, useEffect, useState } from 'react';

const CourseContext = createContext(null);

const STORAGE_KEYS = {
  theme: 'mis_learn_theme',
  mastered: 'mis_learn_mastered_cards',
  completedTopics: 'mis_learn_completed_topics',
  pinnedFormulas: 'mis_learn_pinned_formulas',
};

function readSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function CourseProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [hash, setHash] = useState(() => window.location.hash || '#/');
  const [masteredCards, setMasteredCards] = useState(() => readSet(STORAGE_KEYS.mastered));
  const [completedTopics, setCompletedTopics] = useState(() => readSet(STORAGE_KEYS.completedTopics));
  const [pinnedFormulas, setPinnedFormulas] = useState(() => readSet(STORAGE_KEYS.pinnedFormulas));
  const [searchOpen, setSearchOpen] = useState(false);
  const [graphLabLaunch, setGraphLabLaunch] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigate = (to) => {
    const target = to.startsWith('#') ? to : `#${to}`;
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const toggleMastered = (cardId) => {
    setMasteredCards((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      try {
        localStorage.setItem(STORAGE_KEYS.mastered, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleTopicComplete = (topicId) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      try {
        localStorage.setItem(STORAGE_KEYS.completedTopics, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const togglePinFormula = (formulaId) => {
    setPinnedFormulas((prev) => {
      const next = new Set(prev);
      if (next.has(formulaId)) next.delete(formulaId);
      else next.add(formulaId);
      try {
        localStorage.setItem(STORAGE_KEYS.pinnedFormulas, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const openGraphLab = (launchConfig) => {
    setGraphLabLaunch({ ...launchConfig, ts: Date.now() });
    navigate('/graph-lab');
  };

  return (
    <CourseContext.Provider
      value={{
        theme,
        toggleTheme,
        hash,
        navigate,
        masteredCards,
        toggleMastered,
        completedTopics,
        toggleTopicComplete,
        pinnedFormulas,
        togglePinFormula,
        searchOpen,
        setSearchOpen,
        graphLabLaunch,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  return useContext(CourseContext);
}
