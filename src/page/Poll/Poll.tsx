/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
interface PollChangeParams {
  id: number;
  question: string;
  count: number;
  pollId: number;
}
export default function Poll() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [polls, setPolls] = useState<PollChangeParams[]>([]);

  interface HandleChangeParams {
    value: string;
    index: number;
  }

  const handleChange = (
    value: HandleChangeParams["value"],
    index: HandleChangeParams["index"]
  ): void => {
    if (/^[0-9]?$/.test(value)) {
      // Only allow digits
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Auto-focus to next input
      const nextInput = document.getElementById(
        `poll-${index + 1}`
      ) as HTMLInputElement | null;
      if (value && nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async () => {
    const pollId = pin.join("");
    if (pollId.length === 4) {
      const response = await axios.get(
        `http://localhost:9000/api/question/poll/${pollId}`
      );
      setPolls(response.data);
      // added with the submission id for the
    } else {
      alert("Please enter all 4 digits of the Poll ID.");
    }
  };

  const handleUserVote = async () => {
    console.log(selectedOption);
    try {
      const response = await axios.put(
        `http://localhost:9000/api/question/vote/${selectedOption}`
      );
      if (response.status === 202) {
        //
        toast.success("Voted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Error Submitting Poll ID", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col bg-black text-white justify-center items-center gap-10 h-auto p-20 min-h-screen">
      <h1 className="text-3xl font-bold">Vote</h1>
      <div
        className="bg-black text-white flex flex-row justify-center items-center gap-10"
        id="poll"
      >
        <div className="flex gap-x-3 sm:flex-row " data-hs-pin-input="">
          <label className="">Enter Poll ID</label>
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`poll-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="block w-10 text-center p-1 border-gray-200 rounded-md sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder=".."
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-pink-800 hover:bg-pink-200 focus:outline-none focus:bg-pink-200 dark:text-pink-500 dark:bg-pink-800/30 dark:hover:bg-pink-800/20 dark:focus:bg-pink-800/20"
        >
          Enter poll
        </button>
      </div>
      <form className="max-w-sm mx-auto">
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
      </form>
      <select
        id="underline_select"
        className="block py-2.5 px-5 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        onChange={(e) => setSelectedOption(Number(e.target.value))}
      >
        {polls.map((poll) => (
          <option key={poll.id} value={poll.id}>
            {poll.question}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="py-3 px-4 cursor-pointer  inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 focus:outline-hidden focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
        onClick={handleUserVote}
      >
        Vote
      </button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}
