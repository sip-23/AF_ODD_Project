import { useParams } from "react-router-dom";

const QuestionnaireForm = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Questionnaire Form - Section {id}</h1>
      <p>Form content for section {id}...</p>
    </div>
  );
};

export default QuestionnaireForm;