import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/config";

const Form = () => {
  const router = useRouter();
  const formId = router.query.formId;

  const [forms, formsLoading, formErrors] = useCollection(
    firebase.firestore().collection("data")
  );

  // if (!formsLoading && forms) {
  //   forms.docs.map((doc) => {
  //     if (formId === doc.id && doc.data().isTemplate) {
  //       return doc.data().formData;
  //       console.log(doc.data().formData);
  //     }
  //   });
  // }

  const formik = useFormik({
    initialValues: {},

    onSubmit: (values) => {
      console.log("rajorshi");
      router.push("/thanks");
    },
  });

  const onStart = () => {
    getLocalStream();
    setTimeout(() => {
      alert("Your microphone is in use by another application.");
    }, "3000");
  };

  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        window.localStream = stream; // A
        window.localAudio.srcObject = stream; // B
        window.localAudio.autoplay = true; // C
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`);
      });
  }

  return (
    <div className="container">
      <div className="pt-5 pb-3 text-center">
        <h2>Kindly fill out this VoiceBot form</h2>
        <h4>Interact with the form using your voice</h4>
        <button className="btn btn-outline-primary m-4" onClick={onStart}>
          Start filling out the form
        </button>
        {formsLoading && (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden text-center">Loading...</span>
          </div>
        )}
      </div>

      <form className="w-90 mx-auto" onSubmit={formik.handleSubmit}>
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
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                );
              });
            }
          })}

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
