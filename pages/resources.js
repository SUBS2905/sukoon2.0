import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Head from "next/head";
import { SearchIcon } from "@/components/icons";
import CustomSearchCard from "@/components/CustomSearchCard";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function Resources() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultData, setResultData] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchQuery.length === 0) {
        setLoading(false);
        return;
      }
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_CUSTOM_SEARCH_API}&cx=${process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID}&q=${searchQuery}`
      );

      const data = await res.json();
      setResultData(data.items);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDefaultSearch = async (searchTerm) => {
    setLoading(true);
    const query = `${searchTerm} educational resources`;
    try {
      if (searchQuery.length === 0) {
        setLoading(false);
        return;
      }
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_CUSTOM_SEARCH_API}&cx=${process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID}&q=${query}`
      );
      const data = await res.json();
      setResultData(data.items);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading type="bubbles" />;
  }

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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchQuery}
                />
                <div className="w-1/12 flex items-center justify-end px-4">
                  <button onClick={handleSearch}>
                    <SearchIcon />
                  </button>
                </div>
              </div>
              <div className="w-full flex gap-4">
                <div
                  className="bg-gray-300 text-gray-700 font-semibold p-2 rounded-md cursor-pointer"
                  onClick={() => handleDefaultSearch("anxiety")}
                >
                  Anxiety
                </div>
                <div
                  className="bg-gray-300 text-gray-700 font-semibold p-2 rounded-md cursor-pointer"
                  onClick={() => handleDefaultSearch("depression")}
                >
                  Depression
                </div>
                <div
                  className="bg-gray-300 text-gray-700 font-semibold p-2 rounded-md cursor-pointer"
                  onClick={() => handleDefaultSearch("PTSD")}
                >
                  PTSD
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 items-center justify-center my-8">
            {resultData?.map((searchResult, index) => (
              <CustomSearchCard
                key={index}
                title={searchResult.title}
                displayLink={searchResult.displayLink}
                snippet={searchResult.snippet}
                link={searchResult.link}
              />
            ))}
          </div>
        </Layout>
        <Footer />
      </main>
    </>
  );
}
