import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../context/AppContext";
import * as ApiClient from "../api-client";

export const AddHotels = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(ApiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: (err) => {
      console.log("🚀 ~ AddHotels ~ err:", err);
      showToast({ message: "Error saving hotel", type: "WARNING" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};
