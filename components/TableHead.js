const TableHead = ({ forms, user, questions }) => {
  return (
    <thead>
      {forms && user && (
        <tr>
          <th scope="col">#</th>
          {questions.map((q) => {
            return (
              <th scope="col" key={q}>
                {q}
              </th>
            );
          })}
        </tr>
      )}
    </thead>
  );
};

export default TableHead;
