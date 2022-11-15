import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  const logout = () => {
    signOut(firebase.auth());
  };

  const router = useRouter();
  if (!loading && user === null) {
    router.push("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light px-5">
      <div className="container-fluid">
        <Link href="/dashboard">
          <a className="navbar-brand">
            <img
              src="/mic.png"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top "
            />
            VoiceBot
          </a>
        </Link>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <Link href="/dashboard">
              <a className="nav-link active" aria-current="page">
                Dashboard
              </a>
            </Link>
          </div>
        </div>
        {!loading && user && (
          <div className="me-3">Welcome, {user.displayName}</div>
        )}
        <button className="btn btn-secondary" onClick={logout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
