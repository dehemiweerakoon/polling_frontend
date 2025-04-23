import { motion } from "motion/react";
import { LampContainer } from "../../components/ui/lamp";
import CreatePoll from "../../components/createPoll/CreatePoll";
import { HashLink } from "react-router-hash-link";
import Poll from "../Poll/Poll";
export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Customized Polls
        <br />
        Right Away
      </motion.h1>{" "}
      <HashLink to="/#pollCreation">
        <button className="text-violet-100 border-2 border-violet-700 px-5 py-2 rounded-2xl mt-10 cursor-pointer">
          Create a Poll
        </button>
      </HashLink>
    </LampContainer>
  );
}

const Home = () => {
  return (
    <>
      <LampDemo />
      <CreatePoll />
      <Poll/>
    </>
  );
};

export default Home;
