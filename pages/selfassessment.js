import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import React from "react";

const SelfAssessmentTests = () => {
  return (
    <>
      <Head>
        <title>Sukoon | Self Assessment Tests</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen">
        <Layout className="pt-8">
          <Navbar />
        </Layout>
      </main>
    </>
  );
};

export default SelfAssessmentTests;
