import { formatDate } from "@/utils/utils";

const TestResultCard = ({ testResults }) => {
  const {
    testName,
    testScore,
    maxScore,
    testResult,
    requireFurtherEvaluation,
    updatedAt,
  } = testResults;

  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black cursor-pointer">
          {testName}
        </h5>
        <p className="mb-3 font-semibold text-gray-700 text-justify">
          Test Score: {testScore} / {maxScore}
        </p>
        <p className="mb-3 font-semibold text-gray-700 text-justify">
          Test Outcome: {testResult}
        </p>
        <p className="mb-3 font-semibold text-gray-700 text-justify">
          Further Evaluation Required: {requireFurtherEvaluation ? "Yes" : "No"}
        </p>
        <p className="mb-3 font-semibold text-gray-700 text-justify">
          Assessment completed on: {formatDate(updatedAt)}
        </p>
      </div>
    </>
  );
};

export default TestResultCard;
