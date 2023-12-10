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
  const [message, setMessage] = useState("");

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
        setMessage("Professional notified!");
      }else if(res.status === 409){
        setLoading(false);
        setMessage("Already consulting a professional");
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
      <main className="flex flex-col w-full h-max lg:h-screen
      ">
        <Navbar />
        <Layout className="p-8 lg:px-32">
          <div className="flex flex-col items-center w-full lg:flex-row">
            {/* Left Half */}
            <div className="flex flex-col lg:w-1/2">
              <h1 className="inline-block w-full font-bold text-4xl text-center lg:text-left">
                Professional Details
              </h1>
              <div className="flex flex-col text-center mt-8 lg:w-3/4 lg:text-left">
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
            <div className="w-full mt-8 text-center lg:w-1/2 lg:mt-0 lg:text-left">
              <div className="flex flex-col w-full lg:w-3/4 lg:mt-12">
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
            <p className="font-semibold text-red-600 py-2">{message}</p>
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
