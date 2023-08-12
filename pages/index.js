import Layout from "@/components/Layout";
import LayoutDark from "@/components/LayoutDark";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import HappyWoman from "@/public/assets/happy-woman.jpg";
import HappyMan from "@/public/assets/happy-man.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sukoon | Homepage</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen">
        <Layout className="pt-8">
          <Navbar />
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2">
              <Image
                src={HappyMan}
                alt=""
                className="w-3/4 h-auto rounded-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col items-center self-center">
              <h1 className="inline-block w-full text-dark font-bold text-6xl">
                Breaking Barriers
              </h1>
              <h3 className="inline-block w-full pt-2 font-semibold text-gray-700 text-xl">
                Your Bridge to Confidential Online Mental Health Support
              </h3>
              <p className="my-4 text-base font-medium">
                Welcome to Sukoon, where we believe that taking care of your
                mental health should be as accessible as a click away.
                Adolescence can be a challenging time, and we&apos;re here to
                provide you with the support and tools you need to navigate
                these hurdles with resilience and strength.
              </p>
              <p className="my-4 text-base font-medium">
                We understand that seeking help for mental health
                concerns can be daunting. That&apos;s why we&apos;ve created a
                safe and confidential online space where you can open up without
                fear of judgment or embarrassment. Our expert professionals are
                here to listen, guide, and empower you on your path to mental
                wellness.
              </p>
              <div className="flex items-center self-start mt-2">
                <Link
                  href="/selfassessment"
                  className="flex items-center bg-gray-600 text-white p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark "
                >
                  Take Self Assessment Test
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <LayoutDark className="pt-32 text-white">
          <div className="flex items-center justify-between w-full">
            <div className="w-1/2 flex flex-col items-center self-center">
              <h1 className="inline-block w-full text-dark font-bold text-6xl">
                Courage to Heal
              </h1>
              <h3 className="inline-block w-full pt-2 font-semibold text-gray-300 text-xl">
                Find Solace and Support on Our Digital Platform
              </h3>
              <p className="my-4 text-base font-medium">
                Healing requires courage, and Sukoon is here to honor that
                courage by providing a digital refuge of solace and support. We
                understand that reaching out for help can be intimidating, which
                is why we&apos;ve created a space where you can be heard,
                understood, and guided towards a path of healing.
              </p>
              <p className="my-4 text-base font-medium">
                We believe that technology can bridge the gap between empathy
                and healing. Our platform merges the power of human connection
                with the convenience of digital tools, helping you embark on a
                journey towards inner peace. With expert guidance and
                interactive resources, you can transform your struggles into
                stepping stones towards a brighter future.
              </p>
              <div className="flex items-center self-start mt-2"></div>
            </div>
            <div className="w-1/2 flex justify-end">
              <Image
                src={HappyWoman}
                alt=""
                className="w-3/4 h-auto rounded-lg"
              />
            </div>
          </div>
        </LayoutDark>
      </main>
    </>
  );
}
