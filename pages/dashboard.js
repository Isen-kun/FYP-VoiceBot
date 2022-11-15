import NavBar from "../components/NavBar";
import firebase from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebase.auth());

  const db = firebase.firestore();
  const addFormDocument = async (values, name) => {
    await db.collection("data").doc(name).set({
      formName: values.name,
      isTemplate: true,
      userId: user.uid,
      formData: {},
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    onSubmit: (values) => {
      const docName = uuidv4();
      addFormDocument(values, docName);
      router.push(`/create/${docName}`);
    },
  });

  const [forms, formsLoading, formErrors] = useCollection(
    firebase.firestore().collection("data")
  );

  // if (!formsLoading && forms) {
  //   forms.docs.map((doc) => {
  //     if (doc.data().isTemplate) {
  //       console.log(doc.id, doc.data());
  //     }
  //   });
  // }

  return (
    <>
      <NavBar />

      <div className="container mt-5">
        <div className="row">
          <h5 className="col-11">Create a new form</h5>
          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {user && (
            <button
              type="button"
              className="col btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add
            </button>
          )}
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={formik.handleSubmit}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create a new form
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h6>Enter a name for the form</h6>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <hr />

        <div className="mt-4">
          <h5>Your existing forms:</h5>
          {formsLoading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <ul className="list-group">
            {forms &&
              !loading &&
              user &&
              forms.docs.map((doc) => {
                if (doc.data().isTemplate && user.uid === doc.data().userId) {
                  return (
                    <div
                      className="card list-group-item m-2 shadow"
                      key={doc.id}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{doc.data().formName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted user-select-all">
                          {doc.id}
                        </h6>
                        <Link href={"/responses/" + doc.id}>
                          <a className="btn btn-outline-info">View Responses</a>
                        </Link>
                      </div>
                    </div>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
