/* eslint-disable react/prop-types */
import React from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings, confirmedStay, numDay, cabinCount }) {
  //1.
  const numBookings = bookings.length;

  //2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3.
  const checkin = confirmedStay.length;

  //4.
  const occupation =
    confirmedStay.reduce((acc, cur) => acc + cur.numNight, 0) /
    (numDay * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        color="blue"
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        title="Check in"
        icon={<HiOutlineCalendarDays />}
        value={checkin}
        color="indigo"
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
      />
    </>
  );
}
