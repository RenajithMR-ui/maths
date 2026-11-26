import React from 'react';
import { BookOpen, Code2, ExternalLink, FileEdit, Layers } from 'lucide-react';
import { courseConfig } from '../data/courseConfig';

const DATA_FILES = [
  {
    file: 'src/data/courseConfig.js',
    purpose: 'Course title, code (GAMAT101), branding, exam marks breakdown, Course Outcomes, and SAC portal links.',
  },
  {
    file: 'src/data/modules.js',
    purpose: 'Defines the 4 modules, summaries, hours, SAC YouTube playlists, PDF links, and topic ID ordering.',
  },
  {
    file: 'src/data/topics.js',
    purpose: 'Topic-by-topic study notes: key takeaways, numbered sections, KaTeX equations, tables, and worked examples.',
  },
  {
    file: 'src/data/formulas.js',
    purpose: 'Formula & Theorem Cheat Sheet items organized by module and category.',
  },
  {
    file: 'src/data/flashcards.js',
    purpose: 'Flip flashcards supporting inline ($...$) and block ($$...$$) LaTeX math.',
  },
  {
    file: 'src/data/quizzes.js',
    purpose: 'Multiple-choice practice questions with explanations per module and topic.',
  },
  {
    file: 'src/data/pyq.js',
    purpose: 'PYQ topic weightage heatmap and sample Part A / Part B questions with hints.',
  },
];

export function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 24, maxWidth: 920 }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <span className="badge" style={{ marginBottom: 8 }}>
          Base Model Architecture
        </span>
        <h1 style={{ margin: '4px 0 8px', fontSize: 28 }}>How to Customize Your Course Content</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          This website is built as a clean, data-driven base model for{' '}
          <strong>{courseConfig.courseTitle}</strong> ({courseConfig.courseCode}). All syllabus
          content lives inside <code>src/data/</code> — you never need to touch UI components to
          update notes, modules, formulas, flashcards, or exam questions.
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <FileEdit size={18} style={{ color: 'var(--accent)' }} />
            <h3 style={{ margin: 0 }}>Writing Math Equations (LaTeX)</h3>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--text-secondary)' }}>
            Any string inside notes, worked examples, flashcards, quizzes, or PYQs automatically
            renders KaTeX math:
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--text-secondary)' }}>
            <li>
              Inline math: wrap with single dollars like <code>$f(x) = x^2$</code> (in JS strings,
              double backslashes: <code>{'$\\\\nabla f = \\\\lambda \\\\nabla g$'}</code>).
            </li>
            <li>
              Display block math: wrap with double dollars <code>{'$$\\\\lim_{x\\\\to 0} \\\\frac{\\\\sin x}{x} = 1$$'}</code>.
            </li>
          </ul>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Layers size={18} style={{ color: 'var(--success)' }} />
            <h3 style={{ margin: 0 }}>Reference Sources Used</h3>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--text-secondary)' }}>
            Module structure, playlists, and notes align with KTU 2024 Scheme Group A
            Mathematics-I (<code>GAMAT101</code>) and the SAC KSU CET portal:
          </p>
          <a
            href={courseConfig.referenceBanner.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm"
          >
            <BookOpen size={14} />
            <span>Open SAC Mathematics Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Code2 size={18} style={{ color: 'var(--purple)' }} />
          <h3 style={{ margin: 0 }}>Editable Content Files (src/data/)</h3>
        </div>
        <div className="data-table-wrap" style={{ margin: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>File Path</th>
                <th>What You Can Edit</th>
              </tr>
            </thead>
            <tbody>
              {DATA_FILES.map((item) => (
                <tr key={item.file}>
                  <td>
                    <code>{item.file}</code>
                  </td>
                  <td>{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
