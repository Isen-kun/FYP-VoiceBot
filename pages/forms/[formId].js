import { useFormik, Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/config";

const Forms = () => {
  const router = useRouter();
  const formId = router.query.formId;

  const [forms, formsLoading, formErrors] = useCollection(
    firebase.firestore().collection("data")
  );

  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  // const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (!formsLoading && forms) {
      forms.docs.map((doc) => {
        if (formId === doc.id && doc.data().isTemplate) {
          setName(doc.data().formName);
          setUid(doc.data().userId);
          // setInitialValues(doc.data().formData);
        }
      });
    }
  }, [formsLoading]);

  let initialValues = {};
  if (!formsLoading && forms) {
    forms.docs.map((doc) => {
      if (formId === doc.id && doc.data().isTemplate) {
        // return doc.data().formData;
        // console.log(doc.data());
        initialValues = doc.data().formData;
      }
    });
  }

  const db = firebase.firestore();
  const addFormDocument = async (values) => {
    await db.collection("data").doc().set({
      docId: formId,
      formName: name,
      isTemplate: false,
      userId: uid,
      formData: values,
    });
  };

  const onSubmit = (values) => {
    router.push("/thanks");
    // console.log(values);
    // console.log(name);
    // console.log(uid);
    addFormDocument(values);
  };

  return (
    <div className="container">
      <div className="pt-5 pb-3 text-center">
        <h2>Kindly fill out this VoiceBot form</h2>
        <h4>Interact with the form using your voice</h4>
        <button className="btn btn-outline-primary m-4">
          Start filling out the form
        </button>
        {formsLoading && (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden text-center">Loading...</span>
          </div>
        )}
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="w-90 mx-auto">
          {!formsLoading &&
            forms &&
            forms.docs.map((doc) => {
              if (formId === doc.id && doc.data().isTemplate) {
                const Form = doc.data().formData;
                return Object.keys(Form).map((q) => {
                  return (
                    <div className="row mb-3" key={q}>
                      <label className="col-sm-2 col-form-label fw-bold">
                        {q}
                      </label>
                      <div className="col-sm-10">
                        <Field
                          type="text"
                          id={q}
                          name={q}
                          className="form-control"
                        />
                      </div>
                    </div>
                  );
                });
              }
            })}

          <div className="text-center">
            {/* <button type="reset" className="btn btn-secondary m-1">
              Reset
            </button> */}
            <button type="submit" className="btn btn-success m-1">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Forms;
