import { useState } from "react";

function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setSubmitted(true);
  };

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>Lorem ipsum dolor sit amet...</p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />

        <label htmlFor="email">Email:</label>
        <input id="email" type="email" />

        <label>
          <input type="checkbox" value="music" /> Music
        </label>
        <label>
          <input type="checkbox" value="sports" /> Sports
        </label>
        <label>
          <input type="checkbox" value="tech" /> Tech
        </label>

        <button type="submit">Submit</button>
      </form>

      {submitted && <p>Thank you for signing up!</p>}
    </main>
  );
}

export default App;
