const ProfessionalCard = ({ professional, href }) => {
  const { firstname, lastname, experience, speciality } = professional;

  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black cursor-pointer">
          {firstname} {lastname}
        </h5>
        <p className="mb-3 font-semibold text-gray-700 text-justify">
          Experience: {experience} years
        </p>
        <p className="mb-3 font-semibold text-gray-700 text-justify">
          Speciality: {speciality.join(", ")}
        </p>
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

export default ProfessionalCard;
