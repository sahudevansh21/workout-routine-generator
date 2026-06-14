"use client";

import { useState } from 'react';

const EXERCISES_LIBRARY = [
  { id: '1', name: 'Push-ups', target: 'Chest', equipment: 'None', description: 'Classic bodyweight exercise for chest, shoulders, and triceps.' },
  { id: '2', name: 'Squats', target: 'Legs', equipment: 'None', description: 'Full body exercise targeting legs and glutes.' },
  { id: '3', name: 'Plank', target: 'Core', equipment: 'None', description: 'Isometric exercise for core strength.' },
  { id: '4', name: 'Lunges', target: 'Legs', equipment: 'None', description: 'Excellent for leg strength and balance.' },
  { id: '5', name: 'Triceps Dips', target: 'Arms', equipment: 'Chair', description: 'Targets triceps using a stable surface.' },
  { id: '6', name: 'Bicep Curls', target: 'Arms', equipment: 'Dumbbells', description: 'Classic for bicep development.' },
  { id: '7', name: 'Shoulder Press', target: 'Shoulders', equipment: 'Dumbbells', description: 'Builds shoulder strength and definition.' },
  { id: '8', name: 'Russian Twists', target: 'Core', equipment: 'None', description: 'Works the obliques and core rotators.' },
  { id: '9', name: 'Glute Bridges', target: 'Legs', equipment: 'None', description: 'Activates glutes and strengthens hamstrings.' },
  { id: '10', name: 'Rows', target: 'Back', equipment: 'Dumbbells', description: 'Builds back muscle and improves posture.' },
  { id: '11', name: 'Calf Raises', target: 'Legs', equipment: 'None', description: 'Targets calf muscles for strength and definition.' },
  { id: '12', name: 'Crunches', target: 'Core', equipment: 'None', description: 'Basic exercise for upper abdominal muscles.' },
  { id: '13', name: 'Leg Raises', target: 'Core', equipment: 'None', description: 'Targets lower abdominal muscles.' },
  { id: '14', name: 'Lateral Raises', target: 'Shoulders', equipment: 'Dumbbells', description: 'Isolates side deltoids for broader shoulders.' },
  { id: '15', name: 'Deadlifts (Romanian)', target: 'Back', equipment: 'Dumbbells', description: 'Strengthens lower back, hamstrings, and glutes.' }
];

const ExerciseLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTarget, setFilterTarget] = useState('All');
  const [filterEquipment, setFilterEquipment] = useState('All');

  const filteredExercises = EXERCISES_LIBRARY.filter(exercise => {
    const matchesSearchTerm = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTarget = filterTarget === 'All' || exercise.target === filterTarget;
    const matchesEquipment = filterEquipment === 'All' || exercise.equipment === filterEquipment;
    return matchesSearchTerm && matchesTarget && matchesEquipment;
  });

  return (
    <main className="container">
      <h1 className="gradient-text">Exercise Library</h1>
      <p>Explore a variety of exercises, filter by muscle group or equipment.</p>

      <div className="card form-card" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div style={{ flex: 1, minWidth: '180px' }}>
          <label htmlFor="search">Search Exercise:</label>
          <input
            type="text"
            id="search"
            className="input"
            placeholder="e.g., Push-ups"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label htmlFor="filterTarget">Target Group:</label>
          <select id="filterTarget" value={filterTarget} onChange={(e) => setFilterTarget(e.target.value)} className="select">
            <option value="All">All</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Arms">Arms</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Core">Core</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '150px' }}>
          <label htmlFor="filterEquipment">Equipment:</label>
          <select id="filterEquipment" value={filterEquipment} onChange={(e) => setFilterEquipment(e.target.value)} className="select">
            <option value="All">All</option>
            <option value="None">None (Bodyweight)</option>
            <option value="Dumbbells">Dumbbells</option>
            <option value="Chair">Chair/Bench</option>
          </select>
        </div>
      </div>

      <div className="exercise-grid">
        {filteredExercises.length === 0 ? (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <p>No exercises match your criteria.</p>
          </div>
        ) : (
          filteredExercises.map(exercise => (
            <div key={exercise.id} className="card">
              <h2 className="gradient-text">{exercise.name}</h2>
              <p><strong>Target:</strong> {exercise.target}</p>
              <p><strong>Equipment:</strong> {exercise.equipment}</p>
              <p>{exercise.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default ExerciseLibraryPage;
