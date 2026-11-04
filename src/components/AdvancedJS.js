import { useState } from 'react';

// Function component: AdvancedJS.
function AdvancedJS() {
  // Track which JavaScript demo is currently selected.
  const [activeDemo, setActiveDemo] = useState(0);
  const demoNames = ['JS Demo 1', 'JS Demo 2', 'JS Demo 3', 'JS Demo 4', 'JS Demo 5'];

  // Component UI: HTML rendering.
  return (
    <main className="page-content">
      <h1>JavaScript Demos</h1>

      <div className="js-demo-layout">
        <nav className="js-demo-nav" aria-label="JavaScript demos">
          {demoNames.map((demoName, index) => (
            <button
              key={demoName}
              onClick={() => setActiveDemo(index)}
              type="button"
              aria-pressed={activeDemo === index}
            >
              {demoName}
            </button>
          ))}
        </nav>

        <section
          className="js-demo-panel"
          aria-live="polite"
          aria-label={`${demoNames[activeDemo]} panel`}
        >
          <h2>{demoNames[activeDemo]}</h2>
          <p>This is the selected JavaScript demo.</p>
        </section>
      </div>
    </main>
  );
}

export default AdvancedJS;