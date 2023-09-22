import ReactLoading from "react-loading";

const Loading = ({ type }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <ReactLoading type={type} color="#2563eb" />
    </div>
  );
};

export default Loading;
