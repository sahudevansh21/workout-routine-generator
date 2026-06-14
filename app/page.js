"use client";

import { useState } from 'react';
import Link from 'next/link';

const EXERCISES = [
  { id: '1', name: 'Push-ups', target: 'Chest', equipment: 'None', durationPerSet: 45, description: 'Classic bodyweight exercise for chest, shoulders, and triceps.' },
  { id: '2', name: 'Squats', target: 'Legs', equipment: 'None', durationPerSet: 60, description: 'Full body exercise targeting legs and glutes.' },
  { id: '3', name: 'Plank', target: 'Core', equipment: 'None', durationPerSet: 60, description: 'Isometric exercise for core strength.' },
  { id: '4', name: 'Lunges', target: 'Legs', equipment: 'None', durationPerSet: 45, description: 'Excellent for leg strength and balance.' },
  { id: '5', name: 'Triceps Dips', target: 'Arms', equipment: 'Chair', durationPerSet: 45, description: 'Targets triceps using a stable surface.' },
  { id: '6', name: 'Bicep Curls', target: 'Arms', equipment: 'Dumbbells', durationPerSet: 60, description: 'Classic for bicep development.' },
  { id: '7', name: 'Shoulder Press', target: 'Shoulders', equipment: 'Dumbbells', durationPerSet: 60, description: 'Builds shoulder strength and definition.' },
  { id: '8', name: 'Russian Twists', target: 'Core', equipment: 'None', durationPerSet: 45, description: 'Works the obliques and core rotators.' },
  { id: '9', name: 'Glute Bridges', target: 'Legs', equipment: 'None', durationPerSet: 45, description: 'Activates glutes and strengthens hamstrings.' },
  { id: '10', name: 'Rows', target: 'Back', equipment: 'Dumbbells', durationPerSet: 60, description: 'Builds back muscle and improves posture.' },
  { id: '11', name: 'Calf Raises', target: 'Legs', equipment: 'None', durationPerSet: 30, description: 'Targets calf muscles for strength and definition.' },
  { id: '12', name: 'Crunches', target: 'Core', equipment: 'None', durationPerSet: 45, description: 'Basic exercise for upper abdominal muscles.' }
];

const Home = () => {
  const [equipment, setEquipment] = useState('None');
  const [target, setTarget] = useState('Full Body');
  const [duration, setDuration] = useState('30'); // in minutes
  const [workoutGenerated, setWorkoutGenerated] = useState(false);

  const generateWorkout = () => {
    const filteredExercises = EXERCISES.filter(ex => {
      const equipmentMatch = equipment === 'Any' || ex.equipment === equipment;
      const targetMatch = target === 'Full Body' || ex.target === target;
      return equipmentMatch && targetMatch;
    });

    if (filteredExercises.length === 0) {
      alert('No exercises found matching your criteria. Try different selections!');
      return;
    }

    let currentDuration = 0;
    const selectedRoutine = [];
    const maxDurationSeconds = parseInt(duration) * 60;
    let availableExercises = [...filteredExercises];

    // Attempt to fill the routine close to the desired duration
    while (currentDuration < maxDurationSeconds * 0.9 && availableExercises.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableExercises.length);
      const exercise = availableExercises[randomIndex];

      if (currentDuration + exercise.durationPerSet <= maxDurationSeconds * 1.2) { // Allow slight overshoot
        selectedRoutine.push(exercise);
        currentDuration += exercise.durationPerSet; // Assume durationPerSet is for one set, we can add more sets later
        // Remove exercise to avoid duplicates in this iteration, but can be re-added if logic for sets is improved
        availableExercises.splice(randomIndex, 1); 
      } else {
        // If adding this exercise would overshoot too much, try another one
        availableExercises.splice(randomIndex, 1); // remove and try again
      }
    }

    // If still too short, potentially add more sets or repeat exercises (simple version)
    if (currentDuration < maxDurationSeconds * 0.7 && selectedRoutine.length > 0) {
        for(let i = 0; i < selectedRoutine.length && currentDuration < maxDurationSeconds; i++) {
            selectedRoutine.push({...selectedRoutine[i], id: selectedRoutine[i].id + '-rep-' + i}); // Add a 'repeat' exercise
            currentDuration += selectedRoutine[i].durationPerSet;
        }
    }

    // Add details like sets/reps (simplified for this example)
    const finalRoutine = selectedRoutine.map(ex => ({ ...ex, sets: 3, reps: '8-12' }));

    localStorage.setItem('generatedWorkout', JSON.stringify({
      routine: finalRoutine,
      settings: { equipment, target, duration },
      generatedAt: new Date().toISOString()
    }));
    setWorkoutGenerated(true);
  };

  return (
    <main className="container">
      <h1 className="gradient-text">Workout Routine Generator</h1>
      <p>Create custom workout routines based on your available equipment, target muscle groups, and desired duration.</p>
      
      <div className="card form-card">
        <label htmlFor="equipment">Available Equipment:</label>
        <select id="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)} className="select">
          <option value="Any">Any</option>
          <option value="None">None (Bodyweight)</option>
          <option value="Dumbbells">Dumbbells</option>
          <option value="Chair">Chair/Bench</option>
        </select>

        <label htmlFor="target">Target Muscle Group:</label>
        <select id="target" value={target} onChange={(e) => setTarget(e.target.value)} className="select">
          <option value="Full Body">Full Body</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Arms">Arms</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Core">Core</option>
        </select>

        <label htmlFor="duration">Desired Duration (minutes):</label>
        <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="select">
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
        </select>

        <button onClick={generateWorkout} className="button primary-button">Generate Routine</button>
      </div>

      {workoutGenerated && (
        <div className="card notification-card">
          <p className="gradient-text">Your workout has been generated!</p>
          <Link href="/generated-workout" className="button">View Generated Workout</Link>
        </div>
      )}
    </main>
  );
};

export default Home;
