import React, { useEffect, useState } from "react";
import QuestionComponent from "@/components/QuestionComponent";
import Head from "next/head";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { postTestData } from "@/utils/postTestData";

const STAI = () => {
  const userToken = useProtectedRoute();
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const options = [
    { value: 1, label: "Not at all" },
    { value: 2, label: "Somewhat" },
    { value: 3, label: "Moderately so" },
    { value: 4, label: "Very much so" },
  ];

  const questions = [
    "I feel calm",
    "I feel secure",
    "I feel tense",
    "I feel strained",
    "I feel at ease",
    "I feel at upset",
    "I am presently worrying over possible misfortunes",
    "I feel at satisfied",
    "I feel at frightened",
    "I feel at uncomfortable",
    "I feel at self-confident",
    "I feel at nervous",
    "I feel at jittery",
    "I feel at indecisive",
    "I feel at relaxed",
    "I feel at content",
    "I feel at worried",
    "I feel at confused",
    "I feel at steady",
    "I feel at pleasant",
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(1)
  );

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = parseInt(value, 10);
    setSelectedOptions(newSelectedOptions);
  };

  const totalScore = selectedOptions.reduce((acc, value) => acc + value, 0);

  useEffect(() => {
    if (totalScore >= 45) setResult("High Anxiety");
    else if (totalScore >= 38 && totalScore < 45)
      setResult("Moderate Depression");
    else setResult("Low or No anxiety");
  }, [totalScore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    let requireFurtherEvaluation = false;
    if (totalScore >= 10) requireFurtherEvaluation = true;

    const formData = {
      testName: "STAI",
      testScore: totalScore,
      testResult: result,
      requireFurtherEvaluation: requireFurtherEvaluation,
    };

    const val = postTestData(formData, userToken);
    setMessage(val);
  };

  return (
    <>
      <Head>
        <title>Sukoon | STAI test</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-8 mb-4">
            <h1 className="text-3xl font-bold">
              State - Trait Anxiety Inventory Questionnaire
            </h1>
            <p className="font-semibold text-gray-500">
              The State-Trait Anxiety Inventory questionnaire differentiates
              between state anxiety (temporary feelings of anxiety in response
              to a situation) and trait anxiety (general, long-standing anxiety
              tendencies).
            </p>
            <h3 className="font-bold text-blue-700">
              Read each statement and select the appropriate response to
              indicate how you feel right now, that is, at this very moment.
            </h3>
          </div>
          {questions.map((question, index) => (
            <QuestionComponent
              key={index}
              sNo={index + 1}
              text={question}
              options={options}
              selectedOption={selectedOptions[index]}
              onOptionChange={(value) => handleOptionChange(index, value)}
            />
          ))}
          <div className="w-full mt-4 bg-white flex items-center justify-between p-8 rounded-md shadow-md">
            <h3 className="font-semibold ">
              Total Score:&nbsp;
              <span className="font-bold bg-gray-200 px-4 py-0.5 rounded">
                {totalScore}
              </span>
              &nbsp; /80
            </h3>
            {totalScore >= 38 && (
              <h2 className="font-bold text-red-600">
                Further evaluation required
              </h2>
            )}
            <h1 className="bg-gray-200 w-1/5 text-center font-bold px-8 py-1 rounded ">
              {result}
            </h1>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-8">
            {message && (
              <h3 className="font-semibold p-4 text-green-500">{message}</h3>
            )}
            <button
              className="font-semibold text-white bg-black px-20 py-2 rounded-md"
              onClick={handleSubmit}
              disabled={buttonClicked}
            >
              Submit Results
            </button>
          </div>
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
};

export default STAI;
