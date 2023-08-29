import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import useUserData from "@/hooks/useUserData";
import { formatDate } from "@/utils/utils";
import Head from "next/head";
import { useRouter } from "next/router";

const ViewProfile = () => {
  const router = useRouter();
  const { userData, isLoading } = useUserData();

  const handleClick = () => {
    router.replace("/profile/update");
  };

  if (isLoading) {
    return <div>Please Wait...</div>;
  }
  
  if (userData) {
    const formattedDate = formatDate(userData.profile.dob);
    return (
      <>
        <Head>
          <title>Sukoon | View Profile</title>
        </Head>
        <main className="flex flex-col w-full h-screen">
          <Navbar />
          <Layout className="pt-8">
            <div className="flex justify-between items-center w-full">
              {/* Left Half */}
              <div className="w-1/2 flex flex-col">
                <h1 className="inline-block w-full text-dark font-bold text-4xl">
                  Profile
                </h1>
                <div className="flex flex-col w-3/4 mt-8">
                  <label className="font-semibold text-sm text-gray-600">
                    First Name
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.profile.firstname}
                  </h1>
                  <label className="font-semibold text-sm text-gray-600">
                    Contact Number
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.profile.phone}
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
                <div className="flex flex-col w-3/4 mt-20">
                  <label className="font-semibold text-sm text-gray-600">
                    Last Name
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.profile.lastname}
                  </h1>
                  <label className="font-semibold text-sm text-gray-600">
                    Alternate Contact Number
                  </label>

                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.profile.emergencycontact}
                  </h1>
                  <label className="font-semibold text-sm text-gray-600">
                    Gender
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.profile.gender}
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-full mt-4 flex items-center justify-center">
              <button
                className="bg-black text-white py-2 px-16 rounded-lg"
                onClick={handleClick}
              >
                Update Profile
              </button>
            </div>
          </Layout>
        </main>
      </>
    );
  }
};

export default ViewProfile;
