import { District } from "../../interfaces/publicProvinceInterface";

function SelectDistrict({
  label,
  options,
  setDistrict,
  district,
}: {
  label: string;
  options: District[];
  setDistrict: React.Dispatch<React.SetStateAction<string>>;
  district: string;
}) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label htmlFor="select-address" className="text-sm">
        {label}
      </label>
      <select
        id="select-address"
        className="outline-none border border-gray-300 p-2 rounded-lg w-full"
        onChange={(e) => setDistrict(e.target.value)}
        value={district}
      >
        <option value="" className="text-sm">{`Chọn ${label}`}</option>

        {options?.map((option) => {
          return (
            <option
              key={option.district_id}
              value={option.district_id}
              className="text-sm"
            >
              {option.district_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectDistrict;
