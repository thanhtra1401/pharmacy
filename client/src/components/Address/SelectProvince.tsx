import { Province } from "../../interfaces/publicProvinceInterface";

function SelectProvince({
  label,
  options,
  setProvince,
  province,
}: {
  label: string;
  options: Province[];

  setProvince: React.Dispatch<React.SetStateAction<string>>;
  province: string;
}) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label htmlFor="select-address" className="text-sm">
        {label}
      </label>
      <select
        id="select-address"
        className="outline-none border border-gray-300 p-2 rounded-lg w-full"
        onChange={(e) => setProvince(e.target.value)}
        value={province}
      >
        <option value="" className="text-sm">{`Chọn ${label}`}</option>

        {options?.map((option) => {
          return (
            <option
              key={option.province_id}
              value={option.province_id}
              className="text-sm"
            >
              {option.province_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectProvince;
