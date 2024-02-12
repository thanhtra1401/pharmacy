import { Ward } from "../../interfaces/publicProvinceInterface";

function SelectWard({
  label,
  options,
  setWard,
  ward,
}: {
  label: string;
  options: Ward[];
  setWard: React.Dispatch<React.SetStateAction<string>>;
  ward: string;
}) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label htmlFor="select-address" className="text-sm">
        {label}
      </label>
      <select
        id="select-address"
        className="outline-none border border-gray-300 p-2 rounded-lg w-full"
        onChange={(e) => setWard(e.target.value)}
        value={ward}
      >
        <option value="" className="text-sm">{`Chọn ${label}`}</option>

        {options?.map((option) => {
          return (
            <option
              key={option.ward_id}
              value={option.ward_id}
              className="text-sm"
            >
              {option.ward_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectWard;
