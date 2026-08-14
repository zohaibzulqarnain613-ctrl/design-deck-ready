import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
import { IconType } from "react-icons";

const discoverStrategize = 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2';
const designDevelop = 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2';
const integrateAutomate = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2';
const launchScale = 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className="p-4 bg-transparent text-white w-full h-full">
      <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden">
        {items.map((item) => {
          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              Icon={item.Icon}
              title={item.title}
              imgSrc={item.imgSrc}
              description={item.description}
            />
          );
        })}
      </div>
    </section>
  );
};

interface PanelProps {
  open: number;
  setOpen: Dispatch<SetStateAction<number>>;
  id: number;
  Icon: IconType;
  title: string;
  imgSrc: string;
  description: string;
}

const Panel = ({
  open,
  setOpen,
  id,
  Icon,
  title,
  imgSrc,
  description,
}: PanelProps) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-white hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-900 transition-colors p-3 border-r-[1px] border-b-[1px] border-gray-200 dark:border-gray-800 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180 text-black dark:text-white"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light text-black dark:text-white">{title}</span>
        <div className="w-6 lg:w-full aspect-square bg-black text-white dark:bg-white dark:text-black grid place-items-center">
          <Icon />
        </div>
        <span
          className="w-4 h-4 bg-white group-hover:bg-gray-100 dark:bg-black dark:group-hover:bg-gray-900 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-gray-200 dark:border-gray-800 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
},
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

const items = [
  {
    id: 1,
    title: "Discover & Strategize",
    Icon: FiDollarSign,
    imgSrc: discoverStrategize,
    description:
      "We analyze your business and identify how AI can automate growth.",
  },
  {
    id: 2,
    title: "Design & Develop",
    Icon: FiPlay,
    imgSrc: designDevelop,
    description:
      "Our team builds custom AI callers, chatbots, and smart systems for your goals.",
  },
  {
    id: 3,
    title: "Integrate & Automate",
    Icon: FiBell,
    imgSrc: integrateAutomate,
    description:
      "We connect everything — CRM, email, and workflows — into one seamless system.",
  },
  {
    id: 4,
    title: "Launch & Scale",
    Icon: FiBarChart,
    imgSrc: launchScale,
    description:
      "We deploy, track performance, and optimize your automations for ongoing results.",
  },
];
