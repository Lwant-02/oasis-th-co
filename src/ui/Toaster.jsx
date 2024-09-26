import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterPopUp() {
  return (
    <Toaster
      position="top-center"
      gutter={13}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
        style: {
          fontSize: "16px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
          maxWidth: "500px",
        },
      }}
    />
  );
}
