import { Counter } from "./components/Counter";
import rocketSvg from "./assets/img/EditedBgRmUs.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

export default function App() {
  const notify = () =>
    toast.info("I love you moreeee ❤️", {
      closeButton: false,
      theme: "colored",
    });

  return (
    <main>
      <div className="container">
        <h1>Kavita 💍 Ayush</h1>

        <Counter />

        <p>Until we two become one</p>

        <button onClick={notify}>I have something to tell you</button>

        <ToastContainer
          theme="dark"
          position="top-center"
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
        />
      </div>

      <img src={rocketSvg} alt="" width={500} />
    </main>
  );
}
