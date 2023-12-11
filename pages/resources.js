import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Head from "next/head";
import { SearchIcon } from "@/components/icons";
import CustomSearchCard from "@/components/CustomSearchCard";

export default function Resources() {
  return (
    <>
      <Head>
        <title>Sukoon | Resources</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="p-12 lg:p-32 lg:pt-8">
          <div className="w-full text-center flex flex-col gap-4 lg:text-left">
            <h1 className="text-black font-semibold text-3xl">
              Online Resources
            </h1>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between bg-white rounded-md focus-within:border-2 focus-within:border-blue-500">
                <input
                  className="w-11/12 outline-none px-4 py-2 rounded-md font-semibold"
                  placeholder="Search for resources"
                />
                <div className="w-1/12 flex items-center justify-end px-4">
                  <button>
                    <SearchIcon />
                  </button>
                </div>
              </div>
              <div className="w-full flex gap-4">
                <div className="bg-gray-300 text-gray-700 font-semibold p-2 rounded-md cursor-pointer">
                  Anxiety
                </div>
                <div className="bg-gray-300 text-gray-700 font-semibold p-2 rounded-md cursor-pointer">
                  Depression
                </div>
                <div className="bg-gray-300 text-gray-700 font-semibold p-2 rounded-md cursor-pointer">
                  PTSD
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center my-8">
            <CustomSearchCard
              title="Here goes the title..."
              displayLink="abcdefg.com"
              snippet="Here goes the sniipet for the website"
              link="https://sukoon-web.vercel.app/"
            />
          </div>
        </Layout>
        <Footer />
      </main>
    </>
  );
}
