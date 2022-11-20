import { useFormik, Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/config";
import { useSpeechRecognition } from "react-speech-kit";
import { useSpeechSynthesis } from "react-speech-kit";

const Forms = () => {
  const router = useRouter();
  const formId = router.query.formId;

  const [forms, formsLoading, formErrors] = useCollection(
    firebase.firestore().collection("data")
  );

  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!formsLoading && forms) {
      forms.docs.map((doc) => {
        if (formId === doc.id && doc.data().isTemplate) {
          setName(doc.data().formName);
          setUid(doc.data().userId);
          setFormData(doc.data().formData);
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
    // console.log(values);
    // console.log(name);
    // console.log(uid);
    router.push("/thanks");
    addFormDocument(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
  });

  const [value, setValue] = useState("");
  const [currQue, setCurQue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });

  const onStart = (q) => {
    setCurQue(q);
    listen();
  };

  const onStop = (q) => {
    stop();
    setCurQue("");
    // console.log(q);
    // console.log(value);
    formik.values[q] = value;
    setValue("");
  };

  const { speak } = useSpeechSynthesis();
  const onFormStart = () => {
    speak({ text: "The name of this form is" });
    speak({ text: name });
    speak({ text: "Kindly fill out this VoiceBot form" });
    speak({ text: "Interact with the form using your voice" });
    speak({ text: "The questions in this form are:" });

    onFormFill();
  };

  const onFormFill = () => {
    // console.log(formData);
    Object.keys(formData).forEach((q) => {
      speak({ text: q });
    });
  };

  return (
    <div className="container">
      <div className="pt-5 pb-3 text-center">
        <h1>{name}</h1>
        <h4>Kindly fill out this VoiceBot form</h4>
        <h4>Interact with the form using your voice</h4>
        <button className="btn btn-outline-primary m-4" onClick={onFormStart}>
          Start filling out the form
        </button>
        {formsLoading && (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden text-center">Loading...</span>
          </div>
        )}
      </div>

      {/* <Formik initialValues={initialValues} onSubmit={onSubmit}> */}
      <form
        className="w-90 mx-auto"
        onSubmit={formik.handleSubmit}
        // onReset={formik.handleReset}
      >
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
                    <div className="col-sm-8">
                      {/* <Field */}
                      <input
                        type="text"
                        id={q}
                        name={q}
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values[q]}
                      />
                    </div>
                    {/* <button
                      className="btn btn-light col-sm-1"
                      type="button"
                      onMouseDown={listen}
                      onMouseUp={stop}
                    >
                      🎤
                    </button> */}

                    <button
                      className="btn btn-light col-sm-1"
                      onClick={() => onStart(q)}
                      type="button"
                      disabled={listening}
                    >
                      🎤 Start
                    </button>
                    <button
                      className="btn btn-light col-sm-1"
                      onClick={() => onStop(q)}
                      type="button"
                      disabled={!listening || q !== currQue}
                    >
                      🎤 Stop
                    </button>
                  </div>
                );
              });
            }
          })}

        <div className="text-center">
          {/* <button
            type="reset"
            className="btn btn-secondary m-1"
            // onClick={formik.handleReset}
          >
            Reset
          </button> */}
          <button type="submit" className="btn btn-success m-1">
            Submit
          </button>
        </div>
      </form>
      {/* </Formik> */}
    </div>
  );
};

export default Forms;
