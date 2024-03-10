import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilites</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((item) => (
          <label className="text-sm flex gap-1">
            <input
              type="checkbox"
              value={item}
              {...register("facilities", {
                validate: (value) => {
                  if (value && value.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
