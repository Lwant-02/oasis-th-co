/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
    >
      {isCheckingOut ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
