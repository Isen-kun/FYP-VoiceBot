import NavBar from "../../components/NavBar";
import firebase from "../../firebase/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useCollection } from "react-firebase-hooks/firestore";

const Create = () => {
  const [questions, setQuestions] = useState({});

  const router = useRouter();
  const formId = router.query.formId;
  const db = firebase.firestore();
  const addFormQuestions = async () => {
    await db.collection("data").doc(formId).update({
      formData: questions,
    });
    router.push("/dashboard");
  };

  const formik = useFormik({
    initialValues: {
      qName: "",
    },
    onSubmit: (values) => {
      setQuestions({ ...questions, [values.qName]: "" });
      formik.handleReset();
    },
  });

  const [forms, formsLoading, formErrors] = useCollection(
    firebase.firestore().collection("data")
  );
  const [formName, setFormName] = useState("");

  useEffect(() => {
    if (forms) {
      forms.docs.map((doc) => {
        if (formId === doc.data().docId && doc.data().isTemplate) {
          setFormName(doc.data().formName);
        }
      });
    }
  }, [formsLoading]);

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h2>{formName}</h2>
        {formsLoading && (
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <div className="pt-3">
          <h4>Your current Questions:</h4>
          <ol className="list-group list-group-numbered list-group-flush">
            {Object.keys(questions).map((q) => {
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
          <form
            className="collapse input-group p-3 w-75 mx-auto"
            id="collapseExample"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter your new question"
              id="qName"
              name="qName"
              onChange={formik.handleChange}
              value={formik.values.qName}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Save
            </button>
          </form>
        </div>

        <div className="row justify-content-end">
          <button
            type="button"
            className="btn btn-success col-2"
            onClick={addFormQuestions}
          >
            Save your Form
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
