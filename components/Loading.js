import ReactLoading from "react-loading";

const Loading = ({ type }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-filter backdrop-blur-sm">
      <ReactLoading type={type} color="#2563eb" />
    </div>
  );
};

export default Loading;
