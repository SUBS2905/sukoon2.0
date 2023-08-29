import React, { useEffect, useState } from "react";
import QuestionComponent from "@/components/QuestionComponent";
import Head from "next/head";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SelfAssessmentTests = () => {
  const [result, setResult] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly everyday" },
  ];

  const questions = [
    "Feeling nervous, anxious or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it is hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid as if something awful might happen?",
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
    if (totalScore >= 15) setResult("Severe Anxiety Disorder");
    else if (totalScore >= 10 && totalScore < 15)
      setResult("Moderate Anxiety Disorder");
    else if (totalScore >= 5 && totalScore < 10)
      setResult("Mild Anxiety Disorder");
    else setResult("No Anxiety Disorder");
  }, [totalScore]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    setButtonClicked(true);
    const data = {totalScore: totalScore, result: result};
    console.log(data);
  }

  return (
    <>
      <Head>
        <title>Sukoon | GAD 7 test</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-8 mb-4">
            <h1 className="text-3xl font-bold">
              Generalised Anxiety Disorder Assessment
            </h1>
            <p className="font-semibold text-gray-500">
              The Generalised Anxiety Disorder Assessment (GAD-7) is a
              seven-item instrument that is used to measure or assess the
              severity of generalised anxiety disorder (GAD). The GAD-7 is a
              self-administered patient questionnaire.
            </p>
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
              &nbsp; /21
            </h3>
            {totalScore >= 10 && (
              <h2 className="font-bold text-red-600">
                Further evaluation required
              </h2>
            )}
            <h1 className="bg-gray-200 w-1/4 text-center font-bold px-8 py-1 rounded ">
              {result}
            </h1>
          </div>
          <div className="w-full flex justify-center items-center mt-8">
            <button className="font-semibold text-white bg-black px-20 py-2 rounded-md" onClick={handleSubmit} disabled={buttonClicked}>
              Submit Results
            </button>
          </div>
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
};

export default SelfAssessmentTests;
