import { useState } from "react";

export default function LayoutOnBoarding() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const addActive = (props: number) => {
    setActiveTabIndex(props);
  };
  const array = [0, 1, 2, 3, 4];
  return (
    <div>
      <div className="flex flex-row w-full">
        {activeTabIndex === 0 ? (
          <div className="flex flex-col justify-center">anj</div>
        ) : activeTabIndex === 1 ? (
          <div className="flex flex-col justify-center">kmpret</div>
        ) : activeTabIndex === 2 ? (
          <div className="flex flex-col justify-center">grr</div>
        ) : (
          <></>
        )}
        {array.map((val, index) => (
          <>
            <a
              className={
                index === activeTabIndex
                  ? "not-draggable w-1/3 text-center text-blue-primary h-8 border-b-4 border-blue-primary"
                  : "not-draggable w-1/3 text-center text-[#d9d9d9] h-8 border-b-4 border-[#d9d9d9]"
              }
            >
              <div onClick={() => addActive(index)}>{val}</div>
            </a>
          </>
        ))}
      </div>
    </div>
  );
}
