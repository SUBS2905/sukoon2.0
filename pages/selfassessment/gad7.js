import React, { useEffect, useState } from "react";
import QuestionComponent from "@/components/QuestionComponent";
import Head from "next/head";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cookies from "js-cookie";
import usePostTestData from "@/hooks/usePostTestData";

const GAD7 = () => {
  const userToken = Cookies.get("sessionToken");
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  const { message } = usePostTestData(formData, userToken);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    let requireFurtherEvaluation = false;
    if (totalScore >= 10) requireFurtherEvaluation = true;
    setFormData({
      testName: "GAD-7",
      testScore: totalScore,
      testResult: result,
      requireFurtherEvaluation: requireFurtherEvaluation,
    });
  };

  useEffect(() => {
    if (totalScore >= 15) setResult("Severe Anxiety Disorder");
    else if (totalScore >= 10 && totalScore < 15)
      setResult("Moderate Anxiety Disorder");
    else if (totalScore >= 5 && totalScore < 10)
      setResult("Mild Anxiety Disorder");
    else setResult("No Anxiety Disorder");
  }, [totalScore]);

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

export default GAD7;
