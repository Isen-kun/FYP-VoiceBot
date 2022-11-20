import NavBar from "../../components/NavBar";
import firebase from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Response = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [forms, formsLoading, formErrors] = useCollection(
    firebase.firestore().collection("data")
  );

  const router = useRouter();
  const responseId = router.query.responseId;

  const [formName, setFormName] = useState("");

  useEffect(() => {
    if (forms && user) {
      forms.docs.map((doc) => {
        if (
          responseId === doc.data().docId &&
          user.uid === doc.data().userId &&
          !doc.data().isTemplate
        ) {
          setFormName(doc.data().formName);
        }
      });
    }
  }, [formsLoading]);

  return (
    <>
      <NavBar />

      <div className="container mt-5">
        <h3>{formName}</h3>
        <h6>Here are recieved responses from the form:</h6>
        {loading && (
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {forms &&
          user &&
          forms.docs.map((doc) => {
            if (
              responseId === doc.data().docId &&
              user.uid === doc.data().userId &&
              !doc.data().isTemplate
            ) {
              // console.log(doc.data().formData);
              const response = JSON.stringify(doc.data().formData);
              return (
                <div key={doc.id} className="mt-3">
                  {response}
                  <hr />
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default Response;
