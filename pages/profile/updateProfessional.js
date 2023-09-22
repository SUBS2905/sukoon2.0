import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UpdateProfile = () => {
  const userToken = useProtectedRoute();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    speciality: [],
  });

  if (!userToken) {
    return null;
  }

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "speciality") {
      value = value.split(",").map((item) => item.trim());
    }

    setForm((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/user/professional`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      console.log(data);
      setLoading(false);
      router.replace("/profile/viewProfessional");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  if (loading) {
    return <Loading type="bubbles" />;
  }

  return (
    <>
      <Head>
        <title>Sukoon | Update Profile</title>
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
              <h3 className="inline-block w-full py-2 font-semibold text-gray-700 text-lg">
                Update your profile
              </h3>
              <div className="flex flex-col w-3/4 mt-8">
                <label className="font-semibold text-sm text-gray-600">
                  First Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  className="bg-transparent py-2 mb-8 border-b-2 border-gray-400 font-semibold focus-within:border-black transition-colors duration-500 outline-none"
                />
                <label className="font-semibold text-sm text-gray-600">
                  Contact Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="number"
                  name="contact"
                  onChange={handleChange}
                  className="bg-transparent py-2 mb-8 border-b-2 border-gray-400 font-semibold focus-within:border-black transition-colors duration-500 outline-none"
                />

                <label className="font-semibold text-sm text-gray-600">
                  License Number <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="license_number"
                  onChange={handleChange}
                  className="bg-transparent py-2 mb-8 border-b-2 border-gray-400 font-semibold focus-within:border-black transition-colors duration-500 outline-none"
                />
                <label className="font-semibold text-sm text-gray-600">
                  Date of Birth <span className="text-red-700">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  className="bg-transparent text-sm text-gray-600 focus-within:text-black py-2 mb-8 border-b-2 border-gray-400 font-semibold outline-none cursor-pointer"
                />

                {/* Speciality code goes here */}
                <label className="font-semibold text-sm text-gray-600">
                  Speciality (Comma-separated) <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="speciality"
                  onChange={handleChange}
                  value={form.speciality.join(", ")} // Convert array to comma-separated string
                  className="bg-transparent py-2 mb-8 border-b-2 border-gray-400 font-semibold focus-within:border-black transition-colors duration-500 outline-none"
                />
              </div>
            </div>
            {/* Right half */}
            <div className="w-1/2">
              <div className="flex flex-col w-3/4 mb-4">
                <label className="font-semibold text-sm text-gray-600">
                  Last Name <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  className="bg-transparent py-2 mb-8 border-b-2 border-gray-400 font-semibold focus-within:border-black transition-colors duration-500 outline-none"
                />
                <label className="font-semibold text-sm text-gray-600">
                  Experience (in years) <span className="text-red-700">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  onChange={handleChange}
                  className="bg-transparent py-2 mb-8 border-b-2 border-gray-400 font-semibold focus-within:border-black transition-colors duration-500 outline-none"
                />

                <label className="font-semibold text-sm text-gray-600">
                  Licensing Authority <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  name="licensing_authority"
                  onChange={handleChange}
                  className="bg-transparent py-2 mb-8 border-b-2 border-gray-400 font-semibold focus-within:border-black transition-colors duration-500 outline-none"
                />

                <label className="font-semibold text-sm text-gray-600 mb-4">
                  Gender <span className="text-red-700">*</span>
                </label>
                <div className="flex justify-between">
                  <div className="flex justify-around">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    <label className="font-semibold text-sm mx-2">Male</label>
                  </div>
                  <div className="flex justify-around">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    <label className="font-semibold text-sm mx-2">Female</label>
                  </div>
                  <div className="flex justify-around">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    <label className="font-semibold text-sm mx-2">Other</label>
                  </div>
                  <div className="flex justify-around">
                    <input
                      type="radio"
                      name="gender"
                      value="Prefer not to say"
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    <label className="font-semibold text-sm mx-2">
                      Prefer not to say
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-4 flex items-center justify-center">
            <button
              className="bg-black text-white py-2 px-16 rounded-lg"
              onClick={handleSubmit}
            >
              Update Profile
            </button>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default UpdateProfile;
