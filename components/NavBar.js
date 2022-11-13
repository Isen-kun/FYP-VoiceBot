const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/mic.png"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top "
          />
          VoiceBot
        </a>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">
              Dashboard
            </a>
          </div>
        </div>
        <button className="btn btn-secondary">Sign Out</button>
      </div>
    </nav>
  );
};

export default NavBar;
