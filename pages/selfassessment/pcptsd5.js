import React, { useEffect, useState } from "react";
import QuestionComponent from "@/components/QuestionComponent";
import Head from "next/head";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { postTestData } from "@/utils/postTestData";

const PCPTSD5 = () => {
  const userToken = useProtectedRoute();
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const options = [
    { value: 0, label: "No" },
    { value: 1, label: "Yes" },
  ];

  const questions = [
    "Have you ever experienced this kind of event?",
    "Had nightmares about the event(s) or thought about the event(s) when you did not want to?",
    "Tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?",
    "Been constantly on guard, watchful, or easily startled?",
    "Felt numb or detached from people, activities, or your surroundings?",
    "Felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?",
  ];

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(0)
  );

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = parseInt(value, 10);
    setSelectedOptions(newSelectedOptions);
  };

  let totalScore = 0;
  if (selectedOptions[0] !== 0)
    totalScore = selectedOptions
      .slice(1)
      .reduce((acc, value) => acc + value, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    let requireFurtherEvaluation = false;
    if (totalScore >= 3) requireFurtherEvaluation = true;

    const formData = {
      testName: "PC-PTSD-5",
      testScore: totalScore,
      maxScore: 5,
      testResult: result,
      requireFurtherEvaluation: requireFurtherEvaluation,
    };

    const val = await postTestData(formData, userToken);
    setMessage(val);
  };

  useEffect(() => {
    if (totalScore >= 3) setResult("Positive");
    else setResult("Negative");
  }, [totalScore]);

  return (
    <>
      <Head>
        <title>Sukoon | PC-PTSD-5 test</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-8 mb-4">
            <h1 className="text-3xl font-bold">
              Primary Care PTSD Screen for DSM-5
            </h1>
            <p className="font-semibold text-gray-500">
              The Primary Care PTSD Screen for DSM-5 (PC-PTSD-5) is a 5-item
              screen that was designed to identify individuals with probable
              PTSD in primary care settings.
            </p>
            <div className="w-full flex-flex-col">
              <h3 className="font-bold text-blue-700">
                Sometimes things happen to people that are unusually or
                especially frightening, horrible, or traumatic.
              </h3>
              <h3 className="font-bold text-blue-700">
                For example: a serious accident or fire, a physical or sexual
                assault or abuse, an earthquake or flood, a war seeing someone
                be killed or seriously injured, having a loved one die through
                homicide or suicide.
              </h3>
            </div>
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
              &nbsp; /5
            </h3>
            {totalScore >= 3 && (
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

export default PCPTSD5;
