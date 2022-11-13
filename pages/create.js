import NavBar from "../components/NavBar";

const Create = () => {
  const questions = [
    "What is your name?",
    "What is your age?",
    "Where are you from?",
  ];

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h2>Admission Information Form</h2>

        <div className="pt-3">
          <h4>Your current Questions:</h4>
          <ol class="list-group list-group-numbered list-group-flush">
            {questions.map((q) => {
              return (
                <li className="list-group-item" key={q}>
                  {q}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="text-center p-3">
          <button
            className="btn btn-outline-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add another question
          </button>
          <div
            className="collapse input-group p-3 w-75 mx-auto"
            id="collapseExample"
          >
            <input
              type="text"
              class="form-control"
              placeholder="Enter your new question"
            />
            <button class="btn btn-outline-secondary">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
