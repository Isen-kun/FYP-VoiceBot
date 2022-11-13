const Form = () => {
  return (
    <div className="container">
      <div className="pt-5 pb-3 text-center">
        <h2>Kindly fill out this VoiceBot form</h2>
        <h4>Interact with the form using your voice</h4>
        <button className="btn btn-outline-primary m-4">
          Start filling out the form
        </button>
      </div>
      <form className="w-75 mx-auto">
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label fw-bold">
            Your First name
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label fw-bold">
            Your Last name
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label fw-bold">Your Age</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label fw-bold">Your Gender</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label fw-bold">
            Your Address
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="text-center">
          <button type="reset" className="btn btn-secondary m-1">
            Reset
          </button>
          <button type="submit" className="btn btn-success m-1">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
