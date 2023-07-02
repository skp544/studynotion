import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updateRequirementList = [...requirementList];
    updateRequirementList.splice(index, 1);
    setRequirementList(updateRequirementList);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="label-style" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full form-style"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((item, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs ml-2 text-pure-greys-300"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="errors-style">{label} is required</span>
      )}
    </div>
  );
};

export default RequirementField;
