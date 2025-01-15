import React, { useEffect, useState } from "react";
import {
  FaBus,
  FaCalendarAlt,
  FaExchangeAlt,
  FaInbox,
  FaPen,
} from "react-icons/fa";
import Select from "react-select";
import toast from "react-hot-toast";
import UserServices from "../services/UserServices";
import SearchResult from "./SearchResult";
import PassengerCard from "./PassengerCard";

const SearchBus = () => {
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDest, setSelectedDest] = useState("");
  const [busResults, setBusResults] = useState([]);
  const [tripsResult, setTripsResult] = useState([]);
  const [PNR, setPNR] = useState("");
  const [PNRDetails, setPNRDetails] = useState();

  const handleSwap = () => {
    const temp = selectedSource;
    setSelectedSource(selectedDest);
    setSelectedDest(temp);
  };

  const handleGetCity = async () => {
    try {
      setCities([]);
      const response = await UserServices.getAllCities();
      if (response.error) {
        toast.error(response.message);
        throw new Error(response.error);
      }

      // toast.success(response.message);
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetPNR = async () => {
    try {
      if (!PNR) {
        toast.error("Please Enter Valid PNR number");
        return;
      }
      const query = {
        PNR: PNR,
      };
      const response = await UserServices.getPNR(query);
      // console.log("🚀 ~ handleGetPNR ~ response:", response);
      if (response.error) {
        toast.error(response.message);
        throw new Error(response.message);
      }

      toast.success(response.message);
      setPNRDetails(response.data);
      setBusResults([]);
    } catch (error) {}
  };

  const handelSourceChange = (e) => setSelectedSource(e?.value || "");
  const handelDestChange = (e) => setSelectedDest(e?.value || "");

  const handleSearchBus = async () => {
    try {
      if (!selectedSource || !selectedDest || !date) {
        toast.error(
          "Please select source, destination and date. All fields are required."
        );
        return;
      }
      const query = {
        source: selectedSource,
        destination: selectedDest,
        date: date,
      };

      const response = await UserServices.getSearchBus(query);
      console.log("🚀 ~ handleSearchBus ~ response:", response);
      if (response.error) {
        toast.error(response.message);
        throw new Error(response.message);
      }

      toast.success(response.message);
      setBusResults(response.data.busResults);
      setTripsResult(response.data.tripsResult);
      setPNRDetails();
      setPNR("");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    handleGetCity();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img
        className="w-full h-[98%] opacity-60"
        src="https://s3.rdbuz.com/images/webplatform/india/Homepage-header-800.webp"
        alt="book ticket"
      />
      <div className="absolute top-48 flex flex-col justify-center items-center">
        <div className="bg-white w-[70vw] rounded-lg flex items-center justify-between p-10 m-5 ">
          <div className="flex w-[40vw] justify-between">
            <div className="flex w-full items-center">
              <FaBus className="mr-2" />
              <Select
                id="selectedSource"
                options={cities?.map((trip) => ({
                  value: trip.city_name,
                  label: trip.city_name,
                }))}
                onChange={handelSourceChange}
                className="border-none w-full outline-none bg-transparent"
                placeholder="Source"
                value={
                  cities
                    ?.map((trip) => ({
                      value: trip.city_name,
                      label: trip.city_name,
                    }))
                    .find((option) => option.value === selectedSource) || null
                }
              />
            </div>

            <button onClick={handleSwap} className="text-gray-600 mx-4">
              <FaExchangeAlt />
            </button>

            <div className="flex items-center w-full">
              <FaBus className="mr-2" />
              <Select
                id="selectedDest"
                options={cities?.map((trip) => ({
                  value: trip.city_name,
                  label: trip.city_name,
                }))}
                onChange={handelDestChange}
                className="border-none w-full outline-none bg-transparent"
                placeholder="Destination"
                value={
                  cities
                    ?.map((trip) => ({
                      value: trip.city_name,
                      label: trip.city_name,
                    }))
                    .find((option) => option.value === selectedDest) || null
                }
              />
            </div>
          </div>

          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-1 rounded-md outline-none bg-transparent"
            />
          </div>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSearchBus}
          >
            SEARCH BUSES
          </button>
        </div>

        <div className="bg-white w-fit rounded-lg flex items-center justify-between p-5">
          <div className="flex items-center">
            <FaPen className="mr-2" />
            <input
              type="text"
              value={PNR}
              onChange={(e) => setPNR(e.target.value)}
              placeholder="Enter PNR Number"
              className="border border-gray-300 p-1 rounded-md"
            />
          </div>

          <button
            className="bg-red-500 mx-5 text-white px-4 py-2 rounded-lg"
            onClick={handleGetPNR}
          >
            {" "}
            PNR Enquiry
          </button>
        </div>
      </div>
      {PNRDetails  && <PassengerCard PNRDetails={PNRDetails} />}
      {busResults.length > 0 && (
        <SearchResult
          busResults={busResults}
          tripsResult={tripsResult}
          source={selectedSource}
          destination={selectedDest}
          date={date}
          handleSearchBus={handleSearchBus}
        />
      )}
    </div>
  );
};

export default SearchBus;
