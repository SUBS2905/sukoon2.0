import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { SadIcon } from "@/components/icons";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import useUserData from "@/hooks/useUserData";
import { formatDate } from "@/utils/utils";
import Head from "next/head";
import { useRouter } from "next/router";

const ViewProfile = () => {
  const userToken = useProtectedRoute();
  const router = useRouter();
  const { userData, isLoading } = useUserData();

  const handleClick = () => {
    router.replace("/profile/updateProfessional");
  };

  if (!userToken) {
    return null;
  }

  if (isLoading) {
    return <div>Please Wait...</div>;
  }
  // console.log(userData);
  if (userData?.professional) {
    const formattedDate = formatDate(userData.professional.dob);
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
                    {userData.professional.firstname}
                  </h1>

                  <label className="font-semibold text-sm text-gray-600">
                    Contact Number
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.professional.contact}
                  </h1>

                  <label className="font-semibold text-sm text-gray-600">
                    License Number
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.professional.licence_number}
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
                    {userData.professional.speciality.map(
                      (speciality, index) => (
                        <span
                          key={index}
                          className="bg-transparent py-2 mb-2 font-semibold"
                        >
                          {speciality},&nbsp;
                        </span>
                      )
                    )}
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
                    {userData.professional.lastname}
                  </h1>

                  <label className="font-semibold text-sm text-gray-600">
                    Experience (in years)
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.professional.experience}
                  </h1>

                  <label className="font-semibold text-sm text-gray-600">
                    Licensing Authority
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.professional.licensing_authority}
                  </h1>

                  <label className="font-semibold text-sm text-gray-600">
                    Gender
                  </label>
                  <h1 className="bg-transparent py-2 mb-8 font-semibold">
                    {userData.professional.gender}
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
              It&apos;s quite empty in here!
            </h1>
            <h3 className="text-lg font-semibold my-4">
              Make yourself home by creating your profile 😊
            </h3>
          </div>
          <div className="w-full flex justify-center items-center mt-4">
            <button
              className="bg-black text-white font-semibold py-2 rounded-lg px-16"
              onClick={handleClick}
            >
              Create your profile
            </button>
          </div>
        </main>
      </>
    );
  }
};

export default ViewProfile;
