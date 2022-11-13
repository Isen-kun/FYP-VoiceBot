import SignIn from "../components/SignIn";

const Home = () => {
  return (
    <div className="container text-center">
      <div className="row align-items-center fill">
        <div className="col-8 ">
          <img src="/mic.png" alt="Logo" className="img-fluid" />
          <h1 className="display-1">VoiceBot</h1>
          <blockquote className="blockquote">
            <p>An Accessibility Focused Data Collection Form</p>
          </blockquote>
          <br />
          <p className="font-monospace">The Final Year Project presented by:</p>
          <p className="font-monospace">RAJORSHI GHOSH</p>
          <p className="font-monospace">SAGNIKA BHATTACHARYA</p>
          <p className="font-monospace">SOUMI BHATTACHARJEE</p>
          <p className="font-monospace">NEELADRI MUKHERJEE</p>
        </div>
        <div className="col">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Home;
