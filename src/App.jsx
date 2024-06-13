import { useState } from "react";
import { DatePicker, InputNumber, Select } from "antd";
import "./App.css";
import moment from "moment";

const { RangePicker } = DatePicker;

function App() {
  const days = 10;
  // const guest = 9;

  const [persons, setPersons] = useState({
    adults: 4,
    children: 4,
    pets: 1,
  });
  const [vis, setVis] = useState(false);

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };
  const [dateRange, setDateRange] = useState(null);
  const [daysCount, setDaysCount] = useState(0);

  const handleAdultsChange = (value) => {
    setPersons({ ...persons, adults: value });
  };

  const handleChildrenChange = (value) => {
    setPersons({ ...persons, children: value });
  };

  const handlePetsChange = (value) => {
    setPersons({ ...persons, pets: value });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#ffedd5] p-4 rounded-xl h-[40vh] w-[40vh] ">
        <div className="w-full ">
          <p className="text-left text-[10px] text-gray-400 font-semibold">
            <span className="text-black font-bold text-[15px]">$ 20,000</span> /
            night
          </p>
          <p className="text-left mt-1 text-[10px] text-gray-400 font-semibold">
            max 8 guests, extra guests will cost $1000 per head
          </p>
        </div>
        <div className="w-full mt-2 bg-white rounded-lg border-gray-600 border-[1px]">
          <div className="text-left text-[7px] text-gray-400 font-semibold p-1">
            Check-in Check-out Dates
            <div>
              <RangePicker
                className="mt-1"
                disabledDate={disabledDate}
                style={{ height: "3vh", border: "0px solid grey" }}
                onChange={(dates) => {
                  if (dates) {
                    const formattedDates = dates.map((item) =>
                      moment(item).format("DD-MM-YYYY")
                    );
                    setDateRange(formattedDates);
                    const differenceInDays =
                      dates[1].diff(dates[0], "days") + 1;
                    setDaysCount(differenceInDays);
                    console.log(differenceInDays);
                    console.log(formattedDates);
                  } else {
                    setDateRange(null);
                    console.log(null);
                  }
                }}
         
              />
            </div>
          </div>
          <div className="text-left text-[7px] border-t-[1px] border-gray-600 flex flex-col text-gray-400 font-semibold h-[6vh] p-1">
            Guests
            <span
              onClick={() => setVis(!vis)}
              className="text-gray-400 font-semibold text-[10px] mx-2"
            >
              {persons.adults} Adults, {persons.children} Children,{" "}
              {persons.pets} Pets
            </span>{" "}
            {vis && (
              <div className="relative z-4 top-[2vh] left-[-5px] py-1 flex justify-center items-center flex-col  h-[15vh] w-[20vw] text-black rounded-lg bg-white text-[14px] ">
                <div className="flex w-[90%] items-center justify-around p-1">
                  <p className="w-[50%] ">Adults</p>
                  <div className="flex w-[50%]  items-center justify-around">
                    <div
                      onClick={() =>
                        handleAdultsChange(Math.max(persons.adults - 1, 0))
                      }
                      className="onhover:bg-gray-300"
                    >
                      -{" "}
                    </div>
                    <div>{persons.adults} </div>
                    <div
                      onClick={() =>
                        handleAdultsChange(Math.max(persons.adults + 1, 0))
                      }
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="flex w-[90%] items-center justify-around p-1">
                  <p className="w-[50%] "> Children</p>
                  <div className="flex w-[50%]  items-center justify-around">
                    <div
                      className="onhover:bg-gray-300"
                      onClick={() =>
                        handleChildrenChange(Math.max(persons.children - 1, 0))
                      }
                    >
                      -{" "}
                    </div>
                    <div>{persons.children} </div>
                    <div
                      onClick={() =>
                        handleChildrenChange(Math.max(persons.children + 1, 0))
                      }
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="flex w-[90%] items-center justify-around p-1">
                  <p className="w-[50%] "> Pets</p>
                  <div className="flex w-[50%]  items-center justify-around">
                    <div
                      onClick={() =>
                        handlePetsChange(Math.max(persons.pets - 1, 0))
                      }
                      className="onhover:bg-gray-300"
                    >
                      -{" "}
                    </div>
                    <div>{persons.pets} </div>
                    <div
                      onClick={() =>
                        handlePetsChange(Math.max(persons.pets + 1, 0))
                      }
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="w-full mt-2 bg-[#fb016b] rounded-lg border-gray-600 flex items-center justify-center text-[12px] font-bold h-[5vh]"
          onClick={() => {
            console.log({
              "Guest ": persons,
              date: dateRange,
              daysCount: daysCount,
            });
          }}
        >
          Reserve Now
        </div>
        <div className="flex flex-col items-right mt-2">
          <p className="text-gray-400 text-[10px] font-semibold text-right">
            $20000 x {daysCount} days
          </p>
          {persons.adults + persons.children + persons.pets > 8 ? (
            <p className="text-gray-400 text-[10px] font-semibold text-right">
              ${persons.adults + persons.children + persons.pets - 8} extra
              guest x 1000
            </p>
          ) : (
            <></>
          )}
          <p className="text-gray-900 text-[14px] font-bold text-right">
            Total = $
            {20000 * days * (persons.adults + persons.children + persons.pets) +
              (persons.adults + persons.children + persons.pets > 8
                ? (persons.adults + persons.children + persons.pets - 8) * 1000
                : 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
