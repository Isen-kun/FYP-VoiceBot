import { useFormik, Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
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
  const [onFormStartPending, setOnFormStartPending] = useState(false);

  const recognitionRef = useRef(null);

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = handleResponse;

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleResponse = (event) => {
    const response = event.results[0][0].transcript.toLowerCase();

    if (response === "yes" || response === "yes.") {
      console.log(response);

      const utterance = new SpeechSynthesisUtterance(
        "Thank you. Please start filling out the form."
      );
      window.speechSynthesis.speak(utterance);
      if (!formsLoading) {
        onFormStart();
      } else {
        setOnFormStartPending(true);
      }
    } else {
      console.log(response);
      const utterance = new SpeechSynthesisUtterance(
        "Sorry, I didn't understand. Please try again."
      );
      window.speechSynthesis.speak(utterance);
      setTimeout(() => {
        speakPrompt();
      }, 5000);
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  const speakPrompt = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Are you ready to fill up the form?"
    );
    window.speechSynthesis.speak(utterance);
    utterance.onend = startSpeechRecognition; // start speech recognition after the prompt is finished
  };

  // const { speak } = useSpeechSynthesis();
  // const onFormStart = () => {
  //   speak({ text: "The name of this form is" });
  //   speak({ text: name });
  //   speak({ text: "Kindly fill out this VoiceBot form" });
  //   speak({ text: "Interact with the form using your voice" });
  //   speak({ text: "The questions in this form are:" });

  //   onFormFill();
  // };

  const onFormStart = () => {
    const synth = window.speechSynthesis;
    const utterances = [
      new SpeechSynthesisUtterance("The name of this form is"),
      new SpeechSynthesisUtterance(name),
      new SpeechSynthesisUtterance("Kindly fill out this VoiceBot form"),
      new SpeechSynthesisUtterance("Interact with the form using your voice"),
      new SpeechSynthesisUtterance("The questions in this form are:"),
    ];

    utterances.forEach((utterance) => {
      synth.speak(utterance);
    });

    onFormFill();
    // console.log("form start running");
  };

  // const onFormFill = () => {
  //   // console.log(formData);
  //   Object.keys(formData).forEach((q) => {
  //     speak({ text: q });
  //   });
  // };

  const onFormFill = () => {
    const synth = window.speechSynthesis;
    Object.keys(formData).forEach((q) => {
      const utterance = new SpeechSynthesisUtterance(q);
      synth.speak(utterance);
    });
  };

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
    if (!formsLoading && onFormStartPending) {
      onFormStart();
      setOnFormStartPending(false);
    }
  }, [formsLoading, onFormStartPending]);

  useLayoutEffect(() => {
    // console.log("Layout running");
    speakPrompt();
  }, []);

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

  // const [value, setValue] = useState("");
  // const [currQue, setCurQue] = useState("");
  // const [isListening, setIsListening] = useState(false);
  // let SpeechRecognition;
  // let recognition;

  // if (typeof window !== "undefined") {
  //   SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;
  //   recognition = new SpeechRecognition();

  //   recognition.continuous = true;
  //   recognition.interimResults = true;
  //   recognition.lang = "en-US";

  //   recognition.onstart = () => {
  //     setIsListening(true);
  //   };

  //   recognition.onend = () => {
  //     setIsListening(false);
  //   };

  //   recognition.onresult = (event) => {
  //     let transcript = "";
  //     for (let i = event.resultIndex; i < event.results.length; i++) {
  //       const result = event.results[i][0].transcript;
  //       if (event.results[i].isFinal) {
  //         transcript += result;
  //       } else {
  //         setValue(result);
  //       }
  //     }
  //     setValue(transcript);
  //   };
  // }

  // const onStart = (q) => {
  //   setCurQue(q);
  //   recognition.start();
  // };

  // const onStop = (q) => {
  //   recognition.stop();
  //   setCurQue("");
  //   formik.values[q] = value;
  //   setValue("");
  // };

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
