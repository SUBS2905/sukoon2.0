import React, { useEffect, useState } from "react";
import QuestionComponent from "@/components/QuestionComponent";
import Head from "next/head";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const K10 = () => {
  const [result, setResult] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const options = [
    { value: 1, label: "None of the time" },
    { value: 2, label: " A little of the time" },
    { value: 3, label: "Some of the time" },
    { value: 4, label: "Most of the time" },
    { value: 5, label: "All of the time" },
  ];

  const questions = [
    "About how often did you feel tired out for no good reason?",
    "About how often did you feel nervous?",
    "About how often did you feel so nervous that nothing could calm you down?",
    "About how often did you feel hopeless?",
    "About how often did you feel restless or fidgety?",
    "About how often did you feel so restless you could not sit still?",
    "About how often did you feel depressed?",
    "About how often did you feel that everything was an effort?",
    "About how often did you feel so sad that nothing could cheer you up?",
    "About how often did you feel worthless?",
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
    if (totalScore >= 30) setResult("Severe Mental Disorder");
    else if (totalScore >= 25 && totalScore < 30)
      setResult("Moderate Mental Disorder");
    else if (totalScore >= 20 && totalScore < 25)
      setResult("Mild Mental Disorder");
    else setResult("No Mental Disorder");
  }, [totalScore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    let requireFurtherEvaluation = false;
    if (totalScore >= 25) requireFurtherEvaluation = true;

    const data = {
      testName: "K-10",
      totalScore: totalScore,
      result: result,
      requireFurtherEvaluation: requireFurtherEvaluation,
    };
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Sukoon | K-10 test</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-8 mb-4">
            <h1 className="text-3xl font-bold">
              Kessler Psychological Distress Scale
            </h1>
            <p className="font-semibold text-gray-500">
              Kessler Psychological Distress Scale is a 10-item questionnaire
              intended to yield a global measure of distress based on questions
              about anxiety and depressive symptoms that a person has
              experienced in the most recent 4 week period.
            </p>
            <h3 className="font-bold text-blue-700">
              These questions concern how you have been feeling over the past 30
              days. Select an option for each question that best represents how you
              have been.
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
              &nbsp; /50
            </h3>
            {totalScore >= 25 && (
              <h2 className="font-bold text-red-600">
                Further evaluation required
              </h2>
            )}
            <h1 className="bg-gray-200 w-1/5 text-center font-bold px-8 py-1 rounded ">
              {result}
            </h1>
          </div>
          <div className="w-full flex justify-center items-center mt-8">
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

export default K10;
