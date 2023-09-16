const ClientCard = ({ client, href }) => {
  const { firstname, lastname } = client;

  return (
    <>
      <div className="w-full bg-white flex justify-between items-center p-6 my-4 rounded-md shadow-md">
        <div className="w-2/3 flex">
          <label className="font-bold text-justify">{firstname} {lastname}</label>
        </div>
        <a
          href={href}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Details
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </>
  );
};

export default ClientCard;
