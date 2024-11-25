import { Counter } from "./components/Counter";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import toast, { Toaster } from "react-hot-toast";
import { useState, useCallback, useRef } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [confettiProps, setConfettiProps] = useState({
    run: false,
    recycle: true,
  });
  const timeoutRef = useRef<number | null>(null);

  const stopConfetti = useCallback(() => {
    setConfettiProps((prev) => ({ ...prev, recycle: false }));
    timeoutRef.current = window.setTimeout(() => {
      setConfettiProps({ run: false, recycle: true });
    }, 5000); // Allow 5 seconds for the last pieces to fall
  }, []);

  // Function to launch only confetti
  const launchConfetti = () => {
    setConfettiProps({ run: true, recycle: true });

    // Stop generating new confetti after 3 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(stopConfetti, 3000);
  };

  // Function to launch confetti and show toast
  const notify = () => {
    setIsToastVisible(true);
    launchConfetti(); // Use the confetti-only function here
    toast("💞 2nd Dec", {
      duration: 3000,
      style: {
        fontSize: "1.6rem",
        padding: "10px",
        minWidth: "200px",
        marginTop: "15vh",
        backgroundColor: "#ac9386",
        color: "white",
      },
    });
  };

  return (
    <main className={isToastVisible ? "blurred" : ""}>
      <Confetti
        run={confettiProps.run}
        recycle={confettiProps.recycle}
        numberOfPieces={200}
        gravity={0.1}
      />
      <div className="container">
        <h1>Kavita 💍 Ayush</h1>

        {/* Use launchConfetti for every minute completion */}
        <Counter onMinuteComplete={launchConfetti} />

        <p>💞</p>

        <button className="button" onClick={notify}>
          💍 Aur Shaadi ki date?
          <div className="hoverEffect">
            <div></div>
          </div>
        </button>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "custom-toast",
        }}
      />
    </main>
  );
}
