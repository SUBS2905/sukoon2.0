import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import TestResultCard from "@/components/TestResultCard";
import { SadIcon } from "@/components/icons";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SelfAssessmentResults = () => {
  const userToken = useProtectedRoute();
  const router = useRouter();
  const {id} = router.query;
  const [clientTestData, setClientTestData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchTestData = async() =>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/client/assessmentResults/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            }
        });
        const data = await res.json();
        console.log(data.selfAssessmentTests);
        setClientTestData(data.selfAssessmentTests);
        setLoading(false);
      }catch(err){
        console.error(err);
        setLoading(false);
      }
    }

    fetchTestData();
  },[id, userToken])

  if(loading){
    return <Loading type="bubbles" />
  }

  if(clientTestData.length > 0){
    return (
      <>
      <Head>
        <title>Sukoon | Self Assessment Results</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientTestData?.map((item, index)=>(
            <TestResultCard
              key={index}
              testResults={item}
            />
          ))}
          </div>
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
}else{
  return (
    <>
      <Head>
        <title>Sukoon | Self Assessment Results</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen pt-16 bg-gray-200">
        <div className="w-full flex justify-center p-8">
          <SadIcon />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold my-4">
            No tests taken yet
          </h1>
          <h3 className="text-lg font-semibold my-4">
            Test results will be visible as soon as the client completes one
          </h3>
        </div>
      </main>
    </>
  );
}
}

export default SelfAssessmentResults;
