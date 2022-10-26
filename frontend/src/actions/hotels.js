import axios from "axios";
// * HOTELS SEARCH
export const getNearbyHotels = async (climbCoordinates, formData) => {
  const config = {
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.REACT_APP_RAPID_API_HOST}`,
    },
    params: {
      latitude: climbCoordinates.latitude,
      longitude: climbCoordinates.longitude,
      checkin_date: formData.checkin_date,
      checkout_date: formData.checkout_date,
      currency: formData.currency,
      sort_order: formData.sort_order,
      adults_number: formData.adults_number,
      locale: formData.locale,
    },
  };
  const { data } = await axios.get(
    `${process.env.REACT_APP_HOTELS_URL}`,
    config
  );
  return data;
};
