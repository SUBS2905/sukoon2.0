import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import ProfessionalCard from "@/components/ProfessionalCard";
import { SadIcon } from "@/components/icons";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import useUserData from "@/hooks/useUserData";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Professionals = () => {
  useProtectedRoute();
  const router = useRouter();
  const { userData, isLoading } = useUserData();
  const [loading, setLoading] = useState(false);
  const [professionalsData, setProfessionalsData] = useState([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/professional/all`
        );
        const data = await res.json();
        setProfessionalsData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchProfessionals();
  }, []);

  let associated_professionals;
  if (isLoading || loading) {
    return <Loading type="bubbles" />;
  } else if (userData && userData.profile) {
    associated_professionals = userData.profile.associated_professionals;

    if (professionalsData.length > 0) {
      return (
        <>
          <Head>
            <title>Sukoon | Mental Health Professionals</title>
          </Head>
          <main className="flex flex-col w-full min-h-screen bg-gray-200">
            <Navbar />
            <Layout className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {professionalsData?.map((item, index) => (
                  <ProfessionalCard
                    key={index}
                    professional={item.professional}
                    href={`/professionals/${item.professional._id}`}
                    isAssociated={associated_professionals.includes(item._id)}
                  />
                ))}
              </div>
            </Layout>
            <Footer className="bg-gray-700 text-white" />
          </main>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>Sukoon | View Profile</title>
          </Head>
          <main className="flex flex-col w-full min-h-screen pt-16 bg-gray-200">
            <div className="w-full flex justify-center p-8">
              <SadIcon />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold my-4">
                No professionals around :(
              </h1>
              <h3 className="text-lg font-semibold my-4">
                Professionals will be visible here as soon as they join
              </h3>
            </div>
          </main>
        </>
      );
    }
  } else {
    router.replace("/profile/view");
  }
};

export default Professionals;
