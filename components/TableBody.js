const TableBody = ({ forms, user, responseId, questions }) => {
  const serial = 1;

  return (
    <tbody>
      {forms &&
        user &&
        forms.docs.map((doc) => {
          if (
            responseId === doc.data().docId &&
            user.uid === doc.data().userId &&
            !doc.data().isTemplate
          ) {
            return (
              <tr key={doc.id}>
                <th scope="row">{serial++}</th>
                {questions.map((q) => {
                  return <td key={q}>{doc.data().formData[q]}</td>;
                })}
              </tr>
            );
          }
        })}
    </tbody>
  );
};

export default TableBody;
