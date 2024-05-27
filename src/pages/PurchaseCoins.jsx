/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaBitcoin } from "react-icons/fa";
import SectionTitle from "../components/utils/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDataContext from "../hooks/useDataContext";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const PurchaseCoins = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [payAmount, setPayAmount] = useState(0);

  return (
    <div className="flex flex-col item-center justify-center p-3 my-10 ">
      <SectionTitle title="Purchase Coins" />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm payAmount={payAmount} onClose={onClose} />
                  </Elements>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex gap-5 items-center justify-center flex-wrap">
        <div className="size-60 border rounded-2xl text-5xl p- text-center flex flex-col gap-5 items-center justify-center font-semibold">
          <p className="text-center">
            {" "}
            <span className="flex justify-center items-center gap-2">
              100 <FaBitcoin className="text-3xl text-yellow-400" />
            </span>
            Coins
          </p>
          <Button
            onPress={onOpen}
            onClick={() => setPayAmount(1)}
            className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            Pay $1
          </Button>
        </div>
        <div className="size-60 border rounded-2xl text-5xl p- text-center flex flex-col gap-5 items-center justify-center font-semibold">
          <p className="text-center">
            {" "}
            <span className="flex justify-center items-center gap-2">
              500 <FaBitcoin className="text-3xl text-yellow-400" />
            </span>
            Coins
          </p>
          <Button
            onClick={() => setPayAmount(5)}
            onPress={onOpen}
            className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            Pay $5
          </Button>
        </div>
        <div className="size-60 border rounded-2xl text-5xl p- text-center flex flex-col gap-5 items-center justify-center font-semibold">
          <p className="text-center">
            {" "}
            <span className="flex justify-center items-center gap-2">
              1000 <FaBitcoin className="text-3xl text-yellow-400" />
            </span>
            Coins
          </p>
          <Button
            onClick={() => setPayAmount(10)}
            onPress={onOpen}
            className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
            type="submit"
          >
            Pay $10
          </Button>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = ({ onClose, payAmount }) => {
  // stripe hooks
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user, setReFetchUser } = useDataContext();
  const navigate = useNavigate();

  //   handler
  const handleSubmit = async e => {
    e.preventDefault();
    const toastId = toast.loading("processing...");

    // if stripe or elements not found, then return
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    // if card not found, then return
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    // check if error, then return a toast
    if (error) {
      console.log("payment error", error);
      toast.error(`Failed to payment. ${error?.message}`, { id: toastId });
      setError(error.message);
    }
    // if payment successfully, then console
    else {
      console.log("payment method", paymentMethod);
      setError("");

      const res = await axiosSecure.patch(
        `update-user/coins/${user?.email && user?.email}?amount=${
          payAmount * 100
        }`
      );
      console.log(res.data);
      if (res.data) {
        setReFetchUser(state => !state);
        toast.success(`Payment successfully. ${error?.message}`, {
          id: toastId,
        });
        onClose();
        navigate("/");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="my-10">
        <Button
          onPress={onClose}
          disabled={!stripe}
          className="text-base sm:text-lg text-white rounded-md bg-dark-green text-center"
          type="submit"
        >
          Pay {payAmount}$
        </Button>
        <div className="mt-5">{error}</div>
      </div>
    </form>
  );
};

export default PurchaseCoins;
