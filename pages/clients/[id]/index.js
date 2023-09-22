import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { formatDate } from "@/utils/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ClientDetails = () => {
  useProtectedRoute();
  const router = useRouter();
  const { id } = router.query;
  const [clientDetails, setClientDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleResults = () =>{
    router.push(`/clients/${id}/selfAssessmentResults`);
  }

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/client/${id}`
          );
          const data = await res.json();
          setClientDetails(data.profile);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (isLoading) {
    return <Loading type="bubbles" />;
  }

  if (!clientDetails) {
    return <div>Error fetching data.</div>;
  }

  const formattedDate = formatDate(clientDetails.dob);
  return (
    <>
      <Head>
        <title>Sukoon | Client Details</title>
      </Head>
      <main className="flex flex-col w-full h-screen">
        <Navbar />
        <Layout className="pt-8">
          <div className="flex justify-between items-center w-full">
            {/* Left Half */}
            <div className="w-1/2 flex flex-col">
              <h1 className="inline-block w-full text-dark font-bold text-4xl">
                Client Details
              </h1>
              <div className="flex flex-col w-3/4 mt-8">
                <label className="font-semibold text-sm text-gray-600">
                  First Name
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {clientDetails.firstname}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Contact Number
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {clientDetails.phone}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Date of Birth
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {formattedDate}
                </h1>

              </div>
            </div>
            {/* Right half */}
            <div className="w-1/2">
              <div className="flex flex-col w-3/4">
                <label className="font-semibold text-sm text-gray-600">
                  Last Name
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {clientDetails.lastname}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Gender
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {clientDetails.gender}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-8">
            <button
              className="bg-black text-white font-semibold p-2 px-16 rounded-md"
              onClick={handleResults}
            >
              Self Assessment Results
            </button>
          </div>
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
};

export default ClientDetails;
