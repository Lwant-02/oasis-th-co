import styled from "styled-components";
import { useEffect, useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setComfirmedPaid] = useState(false);

  const { booking = {}, isLoading } = useBooking();

  const { checkin, isChecking } = useCheckIn();

  const [addBreakfast, setAddBreakfast] = useState(false);

  const { settings = {}, isLoading: isLoadingSettings } = useSetting();

  useEffect(() => setComfirmedPaid(booking?.isPaid ?? false), [booking]);
  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNight,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numGuests * numNight;

  function handleCheckin() {
    if (!confirmedPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: optionalBreakfast + totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setComfirmedPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setComfirmedPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmedPaid || isChecking}
        >
          Confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfast
              )}(${formatCurrency(totalPrice)}+${formatCurrency(
                optionalBreakfast
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmedPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
