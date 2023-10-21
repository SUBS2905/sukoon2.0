const DynamicSelect = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-gray-200 font-semibold py-1 px-4 rounded outline-none lg:w-1/5"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DynamicSelect;
