// Import FAQ data and the state hook.
import Questions from './faqs.json';
import { useState } from 'react';

// Function component: FAQ.
function FAQ() {
  // Track the current keyword search value.
  const [enteredKeywords, setEnteredKeywords] = useState('');
  let id = 0;

  // Component UI: HTML rendering.
  return (
    <>
      <div className="page-content">
        <h1>Frequently Asked Questions</h1>

        {/* Search bar for filtering questions and answers. */}
        <div className="row">
          <input
            className="col-11 m-3"
            type="text"
            name="search"
            onChange={(e) => setEnteredKeywords(e.target.value)}
            placeholder="Keywords"
          />
        </div>

        {/* Show all items whose question or answer matches the entered keyword. */}
        <div>
          {Questions.filter(
            (question) =>
              question.question.toLowerCase().includes(enteredKeywords.toLowerCase()) ||
              question.answer.toLowerCase().includes(enteredKeywords.toLowerCase())
          ).map((question) => {
            return (
              <div className="bg-warning p-3 m-2" key={id++}>
                <h4>{question.question}</h4>
                <p>{question.answer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// Export this component so it can be reused across the app.
export default FAQ;