import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottlie_file/Animation - Tea loading.json";

const Loading: React.FC<any> = () => {
  return (
    <div
      className="absolute z-50 w-[100%] h-[100%]"
      style={{
        backgroundColor: "rgba(213, 217, 221,0.7)",
      }}
    >
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        className="pt-[10%] m-auto w-[25%]"
      />
    </div>
  );
};

export default Loading;
