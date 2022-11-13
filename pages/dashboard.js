import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <>
      <NavBar />

      <div className="container mt-5">
        <div className="row">
          <h5 className="col-11">Create a new form</h5>
          <button className="col btn btn-primary">Add</button>
        </div>
        <hr />

        <div className="mt-4">
          <h5>Your existing forms:</h5>
          <ul className="list-group">
            <div className="card list-group-item m-2 shadow">
              <div className="card-body">
                <h5 className="card-title">School admission</h5>
                <h6 class="card-subtitle mb-2 text-muted">Id: kshcytsdchsk</h6>
                <a href="#" className="btn btn-outline-info">
                  View Responses
                </a>
              </div>
            </div>
            <div className="card list-group-item m-2 shadow">
              <div className="card-body">
                <h5 className="card-title">Insuarance Renewal</h5>
                <h6 class="card-subtitle mb-2 text-muted">Id: yatsdcvdfersd</h6>
                <a href="#" className="btn btn-outline-info">
                  View Responses
                </a>
              </div>
            </div>
            <div className="card list-group-item m-2 shadow">
              <div className="card-body">
                <h5 className="card-title">Webinar Registration</h5>
                <h6 class="card-subtitle mb-2 text-muted">Id: arsewtdvxfsds</h6>
                <a href="#" className="btn btn-outline-info">
                  View Responses
                </a>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
