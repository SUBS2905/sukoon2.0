import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { formatDate } from "@/utils/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProfessionalDetails = () => {
  const userToken = useProtectedRoute();
  const router = useRouter();
  const { id } = router.query;
  const [professionalDetails, setProfessionalDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState("");

  const handleNotify = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/professional/${id}/notify`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        setEmailSent("Professional notified!");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        if (id) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/professional/${id}`
          );
          const data = await res.json();
          setProfessionalDetails(data.professional);
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

  if (!professionalDetails) {
    return <div>Error fetching data.</div>;
  }

  const formattedDate = formatDate(professionalDetails.dob);
  return (
    <>
      <Head>
        <title>Sukoon | Professional Details</title>
      </Head>
      <main className="flex flex-col w-full h-screen">
        <Navbar />
        <Layout className="pt-8">
          <div className="flex justify-between items-center w-full">
            {/* Left Half */}
            <div className="w-1/2 flex flex-col">
              <h1 className="inline-block w-full text-dark font-bold text-4xl">
                Professional Details
              </h1>
              <div className="flex flex-col w-3/4 mt-8">
                <label className="font-semibold text-sm text-gray-600">
                  First Name
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {professionalDetails.firstname}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Contact Number
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {professionalDetails.contact}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  License Number
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {professionalDetails.license_number}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Date of Birth
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {formattedDate}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Speciality
                </label>
                <div>
                  <p className="font-semibold">
                    {professionalDetails.speciality.join(", ")}
                  </p>
                </div>
              </div>
            </div>
            {/* Right half */}
            <div className="w-1/2">
              <div className="flex flex-col w-3/4 mt-12">
                <label className="font-semibold text-sm text-gray-600">
                  Last Name
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {professionalDetails.lastname}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Experience (in years)
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {professionalDetails.experience}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Licensing Authority
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {professionalDetails.licensing_authority}
                </h1>

                <label className="font-semibold text-sm text-gray-600">
                  Gender
                </label>
                <h1 className="bg-transparent py-2 mb-8 font-semibold">
                  {professionalDetails.gender}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-8">
            <p className="font-semibold text-red-600 py-2">{emailSent}</p>
            <button
              className="bg-black text-white font-semibold p-2 px-16 rounded-md"
              onClick={handleNotify}
            >
              Notify
            </button>
          </div>
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
};

export default ProfessionalDetails;
