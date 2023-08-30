import DynamicSelect from "./DynamicSelect";

const QuestionComponent = ({
  sNo,
  text,
  options,
  selectedOption,
  onOptionChange,
}) => {
  return (
    <div className="w-full bg-white flex justify-between p-8 my-4 rounded-md shadow-md">
      <div className="w-2/3 flex">
        <div className="mr-32">
          <h1 className="text-violet-700 font-bold w-max">Question {sNo}</h1>
        </div>
        <label className="font-bold text-justify">{text}</label>
      </div>
      <DynamicSelect
        options={options}
        value={selectedOption}
        onChange={(e) => onOptionChange(e.target.value)}
      />
    </div>
  );
};

export default QuestionComponent;
