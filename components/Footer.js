import Layout from "./Layout";
import Link from "next/link";

const Footer = ({className}) => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg mt-auto">
      <Layout className={`py-8 flex items-center justify-between ${className}`}>
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className="flex items-center">
          Built with
          <span className="text-red-600 text-2xl px-1">&hearts;</span>{" "}
          by&nbsp;Subhransu Majhi
        </div>
        <Link
          href="https://www.linkedin.com/in/subhransu-majhi/"
          className="underline underline-offset-2"
        >
          Say Hello
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;
