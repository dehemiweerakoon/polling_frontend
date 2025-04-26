/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface PollData {
  id: number;
  question: string;
  count: number;
  pollId: number;
}

const COLORS = [
  "#1e2c60",
  "#8accb3",
  "#f224a4",
  "#ff3b3b",
  "#feadb9",
  "#fff4a4",
];

export default function PollUpdates() {
  const [pollData, setPollData] = useState<PollData[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [lastReloadTime, setLastReloadTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the key to force re-render
      console.log(reloadKey + "" + lastReloadTime + "");
      setReloadKey((prevKey) => prevKey + 1);
      setLastReloadTime(new Date());
      console.log("Component reloaded at:", new Date().toLocaleTimeString());
      // Initialize socket connection
      const newSocket = io("http://localhost:9000");
      setSocket(newSocket);

      // Get pollId from sessionStorage
      const pollId = sessionStorage.getItem("pollId") || "9";
      console.log(pollId);
      if (!pollId) {
        setError("No poll ID found in session storage");
        return;
      }

      // Join poll room
      newSocket.emit("joinPollRoom", parseInt(pollId));

      // Set up event listeners
      newSocket.on("pollUpdated", (updatedPoll: PollData[]) => {
        console.log("Real-time poll update:", updatedPoll);
        setPollData(updatedPoll);
      });

      newSocket.on("connect_error", (err) => {
        console.error("Connection error:", err);
        setError("Failed to connect to real-time server");
      });
      return () => {
        newSocket.off("pollUpdated");
        //newSocket.off("connect_error");
        //newSocket.disconnect();
      };
    }, 8000); // 120 seconds = 2 minutes

    // Cleanup interval on component unmount

    // Cleanup function
    return () => {
      // newSocket.off("pollUpdated");
      // newSocket.off("connect_error");
      // newSocket.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Format data for PieChart
  const chartData = pollData.map((poll) => ({
    name: poll.question,
    value: poll.count,
  }));

  // if (error) {
  //   return (
  //     <div className="bg-black text-white flex flex-col justify-center items-center h-screen">
  //       <div className="bg-red-500 text-white p-4 rounded-lg">
  //         Error: {error}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col mt-0 justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-8">Live Poll Results</h1>

      <div className="w-full max-w-md h-96 p-4 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Vote Distribution
        </h2>

        {pollData.length > 0 ? (
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value} votes`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No poll data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
