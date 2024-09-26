import styled from "styled-components";
import { useRecentBooking } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStay } from "./useRecentStay";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading: isLoadingDay, bookings } = useRecentBooking();
  const { isLoading: isLoadingStay, confirmedStay, numDay } = useRecentStay();

  const { cabins, isLoading } = useCabins();
  if (isLoadingDay || isLoadingStay || isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStay={confirmedStay}
        numDay={numDay}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStay={confirmedStay} />
      <SalesChart bookings={bookings} numDay={numDay} />
    </StyledDashboardLayout>
  );
}
