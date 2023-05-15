import React, {useState ,CSSProperties } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  

  return (
    <div >
        <div className="sweet-loading justify-content-center  ">
      <ClimbingBoxLoader
        color='#000'
        loading={loading}
        cssOverride=''
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </div>
  );
}

export default Loader;
