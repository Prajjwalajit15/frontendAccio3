import React from 'react';
import NewsFeed from './components/NewsFeed';
import './index.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className='heading'>ACONEWS</h1>
      </header>
      <NewsFeed />
    </div>
  );
}

export default App;
