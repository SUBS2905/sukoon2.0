import Layout from "@/components/Layout";
import LayoutDark from "@/components/LayoutDark";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import HappyWoman from "@/public/assets/happy-woman.jpg";
import HappyMan from "@/public/assets/happy-man.jpg";
import SectionLeftImage from "@/components/SectionLeftImage";
import SectionRightImage from "@/components/SectionRightImage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sukoon | Homepage</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen">
        <Navbar />
        <Layout className="p-12 lg:p-32 lg:pt-8">
          <SectionLeftImage
            title="Breaking Barriers"
            subtitle="Your Bridge to Confidential Online Mental Health Support"
            text1="Welcome to Sukoon, where we believe that taking care of your mental
                  health should be as accessible as a click away. Adolescence can be a
                  challenging time, and we're here to provide you with the support
                  and tools you need to navigate these hurdles with resilience and
                  strength."
            text2="We understand that seeking help for mental health concerns can be
                  daunting. That's why we've created a safe and confidential
                  online space where you can open up without fear of judgment or
                  embarrassment. Our expert professionals are here to listen, guide, and
                  empower you on your path to mental wellness."
            image={HappyMan}
          />
        </Layout>
        <LayoutDark className="p-12 text-white lg:p-32">
          <SectionRightImage
            title="Courage to Heal"
            subtitle="Find Solace and Support on Our Digital Platform"
            text1="Healing requires courage, and Sukoon is here to honor that courage by
                  providing a digital refuge of solace and support. We understand that
                  reaching out for help can be intimidating, which is why we've
                  created a space where you can be heard, understood, and guided towards
                  a path of healing."
            text2="We believe that technology can bridge the gap between empathy and
                  healing. Our platform merges the power of human connection with the
                  convenience of digital tools, helping you embark on a journey towards
                  inner peace. With expert guidance and interactive resources, you can
                  transform your struggles into stepping stones towards a brighter
                  future."
            image={HappyWoman}
          />
        </LayoutDark>
        <Footer />
      </main>
    </>
  );
}
