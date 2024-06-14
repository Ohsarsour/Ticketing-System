import React from 'react';
import KanbanBoard from './Components/KanbanBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-8">Ticketing System</h1>
      <KanbanBoard />
    </div>
  )
}
export default App;
