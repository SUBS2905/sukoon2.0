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
              <h1 className="inline-block w-full text-dark font-bold capitalize text-6xl">
                Heading goes here
              </h1>
              <p className="my-4 text-base font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                faucibus a pellentesque sit amet porttitor eget dolor. Ac ut
                consequat semper viverra nam libero justo laoreet. Proin libero
                nunc consequat interdum varius. Dui accumsan sit amet nulla
                facilisi morbi tempus iaculis urna.
              </p>
              <p className="my-4 text-base font-medium">
                Id faucibus nisl tincidunt eget nullam non nisi. Risus feugiat
                in ante metus dictum at tempor commodo. Ut sem viverra aliquet
                eget sit amet tellus. Duis at consectetur lorem donec massa
                sapien faucibus et. Gravida arcu ac tortor dignissim convallis.
                Mauris sit amet massa vitae tortor condimentum lacinia quis vel.
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
              <h1 className="inline-block w-full text-dark font-bold capitalize text-6xl">
                Heading goes here
              </h1>
              <p className="my-4 text-base font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc
                faucibus a pellentesque sit amet porttitor eget dolor. Ac ut
                consequat semper viverra nam libero justo laoreet. Proin libero
                nunc consequat interdum varius. Dui accumsan sit amet nulla
                facilisi morbi tempus iaculis urna.
              </p>
              <p className="my-4 text-base font-medium">
                Id faucibus nisl tincidunt eget nullam non nisi. Risus feugiat
                in ante metus dictum at tempor commodo. Ut sem viverra aliquet
                eget sit amet tellus. Duis at consectetur lorem donec massa
                sapien faucibus et. Gravida arcu ac tortor dignissim convallis.
                Mauris sit amet massa vitae tortor condimentum lacinia quis vel.
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
