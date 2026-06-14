import './globals.css';

import Link from 'next/link';

export const metadata = {
  title: 'Workout Routine Generator',
  description: 'Generate custom workout routines based on equipment, target muscles, and duration.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <nav className="nav">
            <Link href="/" className="nav-item logo-text">💪 Workout Generator</Link>
            <Link href="/generated-workout" className="nav-item">Generated</Link>
            <Link href="/saved-workouts" className="nav-item">Saved Workouts</Link>
            <Link href="/exercise-library" className="nav-item">Exercise Library</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
