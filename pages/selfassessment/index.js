import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import TestCard from "@/components/TestCard";
import useUserData from "@/hooks/useUserData";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const SelfAssessmentTests = () => {
  const router = useRouter();
  const {userData, isLoading} = useUserData();

  if(isLoading){
    return <Loading type="bubbles" />
  }
  if(!userData){
    router.replace("/login");
  }else if(!userData.profile){
    router.replace("/profile/view");
  }
  
  return (
    <>
      <Head>
        <title>Sukoon | Self Assessment Tests</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="p-8 lg:px-32">
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
              testname="K-10"
              detail="Kessler Psychological Distress Scale is a 10-item questionnaire intended to yield a global measure of distress based on questions about anxiety and depressive symptoms that a person has experienced in the past 4 weeks."
              href="/selfassessment/k10"
            />
            <TestCard
              testname="STAI"
              detail="The State-Trait Anxiety Inventory questionnaire differentiates between state anxiety (temporary feelings of anxiety in response to a situation) and trait anxiety (general, long-standing anxiety tendencies)."
              href="/selfassessment/stai"
            />
            <TestCard
              testname="SPIN"
              detail="The Social Phobia Inventory (SPIN) is a self-report questionnaire for social anxiety disorder. It gauges the extent of fears and avoidance in social situations, aiding in understanding the impact of social anxiety."
              href="/selfassessment/spin"
            />
            <TestCard
              testname="PC-PTSD-5"
              detail="The Primary Care PTSD Screen for DSM-5 (PC-PTSD-5) is a 5-item screen that was designed to identify individuals with probable PTSD in primary care settings."
              href="/selfassessment/pcptsd5"
            />
          </div>
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
};

export default SelfAssessmentTests;
