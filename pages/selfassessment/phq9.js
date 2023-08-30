import React, { useEffect, useState } from "react";
import QuestionComponent from "@/components/QuestionComponent";
import Head from "next/head";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PHQ9 = () => {
  const [result, setResult] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly everyday" },
  ];

  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead, or of hurting yourself in some way?",
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(0)
  );

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = parseInt(value, 10);
    setSelectedOptions(newSelectedOptions);
  };

  const totalScore = selectedOptions.reduce((acc, value) => acc + value, 0);

  useEffect(() => {
    if (totalScore >= 20) setResult("Severe Depression");
    else if (totalScore >= 15 && totalScore < 20)
      setResult("Moderately Severe Depression");
    else if (totalScore >= 10 && totalScore < 15)
      setResult("Moderate Depression");
    else if (totalScore >= 5 && totalScore < 10) setResult("Mild Depression");
    else setResult("No Depression");
  }, [totalScore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    let requireFurtherEvaluation = false;
    if (totalScore >= 10) requireFurtherEvaluation = true;

    const data = {
      testName: "PHQ-9",
      totalScore: totalScore,
      result: result,
      requireFurtherEvaluation: requireFurtherEvaluation,
    };
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Sukoon | PHQ 9 test</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-8 mb-4">
            <h1 className="text-3xl font-bold">Patient Health Questionnaire</h1>
            <p className="font-semibold text-gray-500">
              The Patient Health Questionnaire (PHQ-9) assesses the severity of
              depression symptoms based on nine items. It&apos;s widely used in
              clinical practice and research to screen for and monitor
              depression.
            </p>
            <h3 className="font-bold text-blue-700">
              Over the last 2 weeks, how often have you been bothered by any of
              the following problems?
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
              &nbsp; /27
            </h3>
            {totalScore >= 10 && (
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

export default PHQ9;
