/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
const CreatePoll = () => {
  const [text, setText] = useState("");
  const [pollId, setPollId] = useState("");
  const [question,setQuestion] = useState("")

  const pollCreate = async () => {
    const data = {
      text: text,
    };
    const response = await axios.post("http://localhost:9000/api/poll", data);
    if(response.status==200){
      toast("Poll is created")
    }
    setPollId(response.data.id);
  };
  const pollOptionCreate = async()=>{
    const data ={
      pollId:pollId,
      question:question
    }
    const response = await axios.post("http://localhost:9000/api/question",data);
    if(response.status==200){
      toast('Question is added');
    }
  }

  return (
    <>
    <div className=" p-10 bg-black text-white justify-center items-center flex flex-row min-h-auto text-2xl">
      Poll Creation Page
    </div>
      <div
        className=" w-full  flex flex-col gap-10 justify-center items-center  bg-black min-h-90"
        id="pollCreation"
      >
        <div className="flex flex-row  gap-10 w-full justify-center items-center ">
          <label htmlFor="text" className="text-white">
            Enter your text:
          </label>
          <textarea
            className="py-2.5 sm:py-3 px-4 block w-1/3 border-gray-200 rounded-lg sm:text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-neutral-700 dark:focus:ring-neutral-600"
            rows={3}
            placeholder="Question..."
            data-hs-textarea-auto-height=""
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:outline-hidden focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20"
            onClick={pollCreate}
          >
            Create Poll
          </button>
        </div>
        <div className="flex flex-row  gap-10 w-full justify-center items-center ">
          <label htmlFor="text" className="text-white">
            Enter your Option:
          </label>
          <input
          type="text"
            className="py-2.5 sm:py-3 px-4 block w-1/3 border-gray-200 rounded-lg sm:text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-neutral-700 dark:focus:ring-neutral-600"
            placeholder="Option..."
            data-hs-textarea-auto-height=""
            value={question}
            onChange={(e)=>{setQuestion(e.target.value)}}
          />
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-lime-800 hover:bg-lime-200 focus:outline-hidden focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-lime-500 dark:bg-lime-800/30 dark:hover:bg-lime-800/20 dark:focus:bg-lime-800/20"
          onClick={pollOptionCreate}>
            Add Option
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePoll;
