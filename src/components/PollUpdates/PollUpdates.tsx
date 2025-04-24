import { useEffect, useState } from "react";
import io from "socket.io-client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface DataInt {
  question: string;
  count: string;
}

const COLORS = ["#1e2c60","#8accb3","	#f224a4","#ff3b3b","#feadb9","#fff4a4"];

export default function PollUpdates() {
  const [pollDetails, setPollDetails] = useState<DataInt[]>([]);
  const [data, setData] = useState<DataInt[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:9000"); // adjust as needed
    socket.on("pollUpdated", (updatedPoll) => {
      console.log("Real-time poll update:", updatedPoll);
      setPollDetails(updatedPoll);
    });

    return () => {
      socket.off("pollUpdated");
    };
  }, []);
  useEffect(() => {
    function getReacts() {
      setData([]);
      pollDetails.map((poll: DataInt) => {
        const data = {
          question: poll.question,
          count: poll.count,
        };
        console.log(data)
        setData((prevData) => [...prevData, data]);
      });
    }
    getReacts();
  }, [pollDetails]);

  return (
    <div className="bg-black text-white flex flex-col justify-center items-center">
      <h1>hi ... ...</h1>
      <div></div>
      {/**this main idea is to create  */}
      <div className="w-full max-w-md h-96 p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          User Distribution
        </h2>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="question"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
