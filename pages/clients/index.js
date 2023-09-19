/* eslint-disable react-hooks/exhaustive-deps */
import ClientCard from "@/components/ClientCard";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Head from "next/head";
import { useEffect, useState } from "react";

const Clients = () => {
  const userToken = useProtectedRoute();
  const [associatedClients, setAssociatedClients] = useState([]);
  const [clientInfo, setClientInfo] = useState([]);

  useEffect(() => {
    const getAssociatedClients = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/client/associatedClients`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const data = await res.json();
        setAssociatedClients(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAssociatedClients();
  }, [userToken]);

  useEffect(() => {
    const getClientDetails = async (clientId) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/client/${clientId}`
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch details for each associated client
    const fetchClientDetails = async () => {
      const details = await Promise.all(
        associatedClients.map(async (clientId) => {
          return await getClientDetails(clientId);
        })
      );
      console.log(details);
      setClientInfo(details);
    };

    if (associatedClients.length > 0) {
      fetchClientDetails();
    }
  }, [associatedClients]);

  return (
    <>
      <Head>
        <title>Sukoon | Clients</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen bg-gray-200">
        <Navbar />
        <Layout className="pt-8">
          {clientInfo.map((client, index) => (
            <ClientCard
              key={index}
              client={client.profile}
              href={`/clients/${client._id}/`}
            />
          ))}
        </Layout>
        <Footer className="bg-gray-700 text-white" />
      </main>
    </>
  );
};

export default Clients;
