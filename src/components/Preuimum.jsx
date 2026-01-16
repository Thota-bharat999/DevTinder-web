import axios from "axios";
import { BASE_URL } from "../utilis/constants";
import React from "react";

const Preuimum = () => {

  const handleBuyClick = async (type) => {
  try {
    const res = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    console.log("Payment Response:", res.data);

    const { amount, currency, notes, orderId, keyId } = res.data;

    const options = {
  key: keyId,
  amount,
  currency,
  name: "DevTinder",
  description: "Premium Membership",
  order_id: orderId,

  handler: function (response) {
    console.log("Payment Success:", response);
  },

  prefill: {
    name: `${notes.firstName} ${notes.lastName}`,
    email: notes.emailId,
    contact: "9999999999",
  },

  theme: { color: "#F37254" },
};

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("Payment error:", err);
  }
};


  return (
    <div className="m-10">
      <div className="flex w-full">

        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul>
            <li> - Chat with other people</li>
            <li> - Inifiniye connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("Silver")}
          >
            Buy Silver
          </button>
        </div>

        <div className="divider divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
           <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleBuyClick("Gold")}
          >
            Buy Gold
          </button>
        </div>

      </div>
    </div>
  );
};

export default Preuimum;
