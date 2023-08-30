import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import TestCard from "@/components/TestCard";
import Head from "next/head";
import React from "react";

const SelfAssessmentTests = () => {
  return (
    <>
      <Head>
        <title>Sukoon | Self Assessment Tests</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TestCard
              testname="GAD - 7"
              detail="The Generalised Anxiety Disorder Assessment (GAD-7) is a seven-item instrument that is used to measure or assess the severity of generalised anxiety disorder (GAD). The GAD-7 is a self-administered patient questionnaire."
              href="/selfassessment/gad7"
            />
            <TestCard
              testname="PHQ - 9"
              detail="The Patient Health Questionnaire (PHQ-9) assesses the severity of depression symptoms based on nine items. It's widely used in clinical practice and research to screen for and monitor depression."
              href="/selfassessment/phq9"
            />
            <TestCard
              testname="BDI"
              detail="The Beck's Depression Inventory is a widely used self-report questionnaire that measures the presence and severity of depressive symptoms. It assesses cognitive, affective, and somatic symptoms of depression."
              href="/selfassessment/bdi"
            />
            <TestCard
              testname="STAI"
              detail="The State-Trait Anxiety Inventory questionnaire differentiates between state anxiety (temporary feelings of anxiety in response to a situation) and trait anxiety (general, long-standing anxiety tendencies)."
              href="/selfassessment/stai"
            />
            <TestCard
              testname="SPIN"
              detail="The Social Phobia Inventory (SPIN) is a self-report questionnaire for social anxiety disorder. It gauges the extent of fears and avoidance in social situations, aiding in understanding the impact of social anxiety."
            />
          </div>
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
};

export default SelfAssessmentTests;
