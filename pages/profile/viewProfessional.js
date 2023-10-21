import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
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
    return <Loading type="bubbles" />;
  }
  // console.log(userData);
  if (userData?.professional) {
    const formattedDate = formatDate(userData.professional.dob);
    return (
      <>
        <Head>
          <title>Sukoon | View Profile</title>
        </Head>
        <main className="flex flex-col w-full h-max lg:h-screen">
          <Navbar />
          <Layout className="p-8 lg:px-32">
            <div className="flex flex-col items-center w-full lg:flex-row">
              {/* Left Half */}
              <div className="w-full flex flex-col lg:w-1/2">
                <h1 className="inline-block w-full font-bold text-4xl text-center lg:text-left">
                  Profile
                </h1>
                <div className="flex flex-col text-center mt-8 lg:w-3/4 lg:text-left">
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
                    {userData.professional.license_number}
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
                      {userData.professional.speciality.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
              {/* Right half */}
              <div className="w-full pt-8 text-center lg:w-1/2 lg:mt-0 lg:text-left">
                <div className="flex flex-col w-full lg:w-3/4 lg:mt-12">
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
          <div className="w-full flex flex-col items-center justify-center text-center">
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
