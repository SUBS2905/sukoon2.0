import React, { useEffect, useState } from "react";
import QuestionComponent from "@/components/QuestionComponent";
import Head from "next/head";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import usePostTestData from "@/hooks/usePostTestData";
import useProtectedRoute from "@/hooks/useProtectedRoute";

const SPIN = () => {
  const userToken = useProtectedRoute();
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  const { message } = usePostTestData(formData, userToken);

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "A little bit" },
    { value: 2, label: "Somewhat" },
    { value: 3, label: "Very much" },
    { value: 4, label: "Extremely" },
  ];

  const questions = [
    "I am afraid of people in authority.",
    "I am bothered by blushing in front of people.",
    "Parties and social events scare me.",
    "I avoid talking to people I don't know.",
    "Being criticized scares me a lot.",
    "I avoid doing things or speaking to people for fear of embarrassment.",
    "Sweating in front of people causes me distress.",
    "I avoid going to parties.",
    "I avoid activities in which I am the center of attention.",
    "Talking to strangers scares me.",
    "I avoid having to give speeches.",
    "I would do anything to avoid being criticized.",
    "Heart palpitations bother me when I am around people.",
    "I am afraid of doing things when people might be watching.",
    "Being embarrassed or looking stupid are among my worst fears.",
    "I avoid speaking to anyone in authority.",
    "Trembling or shaking in front of others is distressing to me.",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    let requireFurtherEvaluation = false;
    if (totalScore >= 31) requireFurtherEvaluation = true;
    setFormData({
      testName: "SPIN",
      testScore: totalScore,
      testResult: result,
      requireFurtherEvaluation: requireFurtherEvaluation,
    });
  };

  useEffect(() => {
    if (totalScore >= 51) setResult("Very Severe Social Phobia");
    else if (totalScore >= 41 && totalScore < 51)
      setResult("Severe Social Phobia");
    else if (totalScore >= 31 && totalScore < 41)
      setResult("Moderate Social Phobia");
    else if (totalScore >= 21 && totalScore < 31)
      setResult("Mild Social Phobia");
    else setResult("No Social Phobia");
  }, [totalScore]);

  return (
    <>
      <Head>
        <title>Sukoon | SPIN test</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-8 mb-4">
            <h1 className="text-3xl font-bold">Social Phobia Inventory</h1>
            <p className="font-semibold text-gray-500">
              The Social Phobia Inventory is a 17-item self-rating for social
              phobia. The scale includes items assessing each of the symptom
              domains of social anxiety disorder (fear, avoidance, and
              physiologic arousal).
            </p>
            <h3 className="font-bold text-blue-700">
              Over the past 2 weeks, how often have you been bothered by any of
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
              &nbsp; /68
            </h3>
            {totalScore >= 31 && (
              <h2 className="font-bold text-red-600">
                Further evaluation required
              </h2>
            )}
            <h1 className="bg-gray-200 w-1/4 text-center font-bold px-8 py-1 rounded ">
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

export default SPIN;
