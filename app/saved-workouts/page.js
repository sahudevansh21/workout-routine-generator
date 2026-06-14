"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SavedWorkoutsPage = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWorkouts = localStorage.getItem('savedWorkouts');
      if (storedWorkouts) {
        setSavedWorkouts(JSON.parse(storedWorkouts));
      }
    }
  }, []);

  const deleteWorkout = (id) => {
    const updatedWorkouts = savedWorkouts.filter(workout => workout.id !== id);
    setSavedWorkouts(updatedWorkouts);
    localStorage.setItem('savedWorkouts', JSON.stringify(updatedWorkouts));
    if (selectedWorkout && selectedWorkout.id === id) {
      setSelectedWorkout(null);
    }
  };

  return (
    <main className="container">
      <h1 className="gradient-text">Your Saved Workouts</h1>

      {savedWorkouts.length === 0 ? (
        <div className="card notification-card">
          <p>You haven't saved any workouts yet.</p>
          <Link href="/" className="button">Generate Your First Workout</Link>
        </div>
      ) : (
        <div className="workout-list">
          {savedWorkouts.map(workout => (
            <div key={workout.id} className="card workout-item">
              <h2>Routine from {new Date(workout.generatedAt).toLocaleDateString()}</h2>
              <p><strong>Target:</strong> {workout.settings.target}</p>
              <p><strong>Duration:</strong> {workout.settings.duration} minutes</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => setSelectedWorkout(workout)} className="button secondary-button">View Details</button>
                <button onClick={() => deleteWorkout(workout.id)} className="button delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedWorkout && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2 className="gradient-text">Details for Selected Workout</h2>
          <h3>Routine Settings:</h3>
          <p><strong>Equipment:</strong> {selectedWorkout.settings.equipment}</p>
          <p><strong>Target:</strong> {selectedWorkout.settings.target}</p>
          <p><strong>Duration:</strong> {selectedWorkout.settings.duration} minutes</p>
          <p><em>Generated on: {new Date(selectedWorkout.generatedAt).toLocaleDateString()}</em></p>
          
          <h3 style={{ marginTop: '1.5rem' }}>Exercises:</h3>
          <ul className="workout-list">
            {selectedWorkout.routine.map((ex, index) => (
              <li key={ex.id + '-view-' + index} className="workout-item card secondary-button">
                <h4>{ex.name}</h4>
                <p><strong>Target:</strong> {ex.target}</p>
                <p><strong>Equipment:</strong> {ex.equipment}</p>
                <p><strong>Sets:</strong> {ex.sets}, <strong>Reps:</strong> {ex.reps}</p>
                <p><em>{ex.description}</em></p>
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedWorkout(null)} className="button secondary-button" style={{ marginTop: '1.5rem' }}>Close Details</button>
        </div>
      )}
    </main>
  );
};

export default SavedWorkoutsPage;
