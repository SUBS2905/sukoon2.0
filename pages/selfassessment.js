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
              testname="BASC - 3"
              detail="The Behavior Assessment System for Children, Third Edition (BASC-3) offers several different forms designed to aid in collecting information regarding at-risk adaptive behavioral and/or emotional problems."
            />
            <TestCard
              testname="GAD - 7"
              detail="The Generalised Anxiety Disorder Assessment (GAD-7) is a seven-item instrument that is used to measure or assess the severity of generalised anxiety disorder (GAD). The GAD-7 is a self-administered patient questionnaire."
            />
            <TestCard
              testname="PHQ - 9"
              detail="The Behavior Assessment System for Children, Third Edition (BASC-3) offers several different forms designed to aid in collecting information regarding at-risk adaptive behavioral and/or emotional problems."
            />
          </div>
        </Layout>
      </main>
    </>
  );
};

export default SelfAssessmentTests;
