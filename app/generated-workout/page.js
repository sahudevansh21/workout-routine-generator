"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const GeneratedWorkoutPage = () => {
  const [workout, setWorkout] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWorkout = localStorage.getItem('generatedWorkout');
      if (storedWorkout) {
        setWorkout(JSON.parse(storedWorkout));
      }
    }
  }, []);

  const saveWorkout = () => {
    if (workout) {
      const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
      // Add a unique ID for the saved workout (e.g., timestamp)
      const workoutToSave = { ...workout, id: Date.now() };
      savedWorkouts.push(workoutToSave);
      localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
      setSavedMessage('Workout saved successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  if (!workout) {
    return (
      <main className="container">
        <h1 className="gradient-text">No Workout Generated</h1>
        <p>Please go back to the <Link href="/" className="gradient-text">home page</Link> to generate a workout.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <h1 className="gradient-text">Your Generated Workout</h1>
      <div className="card">
        <h2>Routine Settings:</h2>
        <p><strong>Equipment:</strong> {workout.settings.equipment}</p>
        <p><strong>Target:</strong> {workout.settings.target}</p>
        <p><strong>Duration:</strong> {workout.settings.duration} minutes</p>
        <p><em>Generated on: {new Date(workout.generatedAt).toLocaleDateString()}</em></p>
      </div>

      <div className="card">
        <h2>Exercises:</h2>
        <ul className="workout-list">
          {workout.routine.map((ex, index) => (
            <li key={ex.id + '-' + index} className="workout-item card secondary-button">
              <h3>{ex.name}</h3>
              <p><strong>Target:</strong> {ex.target}</p>
              <p><strong>Equipment:</strong> {ex.equipment}</p>
              <p><strong>Sets:</strong> {ex.sets}, <strong>Reps:</strong> {ex.reps}</p>
              <p><em>{ex.description}</em></p>
            </li>
          ))}
        </ul>
      </div>

      <div className="card notification-card" style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={saveWorkout} className="button primary-button">Save Routine</button>
        <Link href="/" className="button secondary-button">Generate New</Link>
      </div>
      {savedMessage && <p className="gradient-text" style={{ textAlign: 'center' }}>{savedMessage}</p>}
    </main>
  );
};

export default GeneratedWorkoutPage;
