import { useEffect, useState } from 'react';
import { PADS } from './pads';
import './App.css';

function DrumPad({ pad, onPlay }) {
  const handleClick = () => {
    const audio = document.getElementById(pad.keyTrigger);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    onPlay(pad.id);
  };

  return (
    <button
      className="drum-pad"
      id={pad.id}
      onClick={handleClick}
    >
      {pad.keyTrigger}
      <audio
        className="clip"
        id={pad.keyTrigger}
        src={pad.url}
      />
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState('Play a sound');

  const handlePlay = (label) => {
    setDisplay(label);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const pad = PADS.find(p => p.keyTrigger === key);
      if (!pad) return;

      const audio = document.getElementById(key);
      if (!audio) return;

      audio.currentTime = 0;
      audio.play();
      setDisplay(pad.id);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="drum-machine" className="drum-machine">
      <div className="drum-container">
        <div className="pads">
          {PADS.map(pad => (
            <DrumPad key={pad.id} pad={pad} onPlay={handlePlay} />
          ))}
        </div>
        <div id="display" className="display">
          {display}
        </div>
      </div>
    </div>
  );
}

export default App;
