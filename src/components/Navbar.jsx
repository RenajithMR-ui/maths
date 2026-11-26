import React, { useState } from 'react';
import {
  BookOpen,
  Calculator,
  FileText,
  GitBranch,
  HelpCircle,
  Layers,
  LineChart,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { courseConfig } from '../data/courseConfig';
import { useCourse } from '../context/CourseContext';
import ksucetLight from '../assets/ksucet-light.png';
import ksucetDark from '../assets/ksucet-dark.png';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';

const NAV_ITEMS = [
  { label: 'Modules', route: '#/', match: (h) => h === '#/' || h.startsWith('#/module') || h.startsWith('#/topic'), icon: BookOpen },
  { label: 'Graph & LPP', route: '#/graph-lab', match: (h) => h.startsWith('#/graph-lab'), icon: LineChart },
  { label: 'Question Papers', route: '#/pyq', match: (h) => h.startsWith('#/pyq'), icon: Calculator },
  { label: 'Formulas', route: '#/formulas', match: (h) => h.startsWith('#/formulas'), icon: FileText },
  { label: 'Mind Map', route: '#/mindmap', match: (h) => h.startsWith('#/mindmap'), icon: GitBranch },
  { label: 'Flashcards', route: '#/flashcards', match: (h) => h.startsWith('#/flashcards'), icon: Layers },
  { label: 'Quiz', route: '#/quiz', match: (h) => h.startsWith('#/quiz'), icon: HelpCircle },
  { label: 'Guide', route: '#/about', match: (h) => h.startsWith('#/about'), icon: Sparkles },
];

export function Navbar() {
  const { theme, toggleTheme, hash, navigate, setSearchOpen } = useCourse();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (route) => {
    setDrawerOpen(false);
    navigate(route);
  };

  const ksucetSrc = theme === 'dark' ? ksucetDark : ksucetLight;
  const sacLogoSrc = theme === 'dark' ? logoDark : logoLight;

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Official SAC LEARN Dual-Logo & Heading Lockup */}
        <a
          href="#/"
          className="brand-link"
          onClick={(e) => {
            e.preventDefault();
            handleNav('#/');
          }}
        >
          <div className="brand-logos">
            <img src={ksucetSrc} alt="KSU CET" className="brand-logo-img" />
            <span className="brand-divider" aria-hidden="true" />
            <img src={sacLogoSrc} alt="SAC LEARN logo" className="brand-logo-img" />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">{courseConfig.brandName}</span>
            <span className="brand-subtitle">{courseConfig.brandSubtitle}</span>
          </div>
        </a>

        <nav className="nav-links" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.match(hash);
            return (
              <button
                key={item.route}
                type="button"
                className={`nav-pill ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.route)}
              >
                <Icon size={13.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            title="Search topics, formulas, flashcards (Ctrl+K)"
          >
            <Search size={14} />
            <span className="kbd-hint">Ctrl+K</span>
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label="Toggle navigation drawer"
          >
            {drawerOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="mobile-drawer">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.route}
                type="button"
                className={`nav-pill ${item.match(hash) ? 'active' : ''}`}
                onClick={() => handleNav(item.route)}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
