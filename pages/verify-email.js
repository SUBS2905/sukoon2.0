import { FailedIcon, SuccessIcon } from "@/components/icons";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import useVerifyUser from "@/hooks/useVerifyUser";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  useProtectedRoute();
  const router = useRouter();
  const { vtoken } = router.query;
  const verify = useVerifyUser({ vtoken });

  return (
    <>
      <Head>
        <title>Sukoon | Verify</title>
      </Head>
      <main className="flex flex-col w-full min-h-screen pt-16 bg-gray-200">
        <div className="w-full flex justify-center p-8">
          {verify ? <SuccessIcon /> : <FailedIcon />}
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold my-4">Email Verification</h1>
          {verify ? (
            <>
              <p className="text-gray-600 text-md font-semibold ">
                Your email was successfully verified
              </p>
            </>
          ) : (
            <p className="text-gray-600 text-md font-semibold ">
              Your email is not verified yet.
            </p>
          )}
          <Link
            className="text-blue-700 text-sm underline underline-offset-2"
            href="/"
          >
            Go to home page
          </Link>
        </div>
      </main>
    </>
  );
};

export default VerifyEmail;
