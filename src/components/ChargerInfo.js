import React from "react";

const ChragerInfo = ({depotInfo}) =>  {
    return (
        
        <div className="h-40 p-4 flex flex-col ">
          {depotInfo ? (
            <>
              <h3 className="text-blue-950 font-serif">
                Depot Name: {depotInfo.depotName}
              </h3>
              <h3 className="text-blue-950 font-serif">
                Depot ID: {depotInfo.depotId}
              </h3>
              <h3 className="text-blue-950 font-serif">
                Charger ID: {depotInfo.chargerId}
              </h3>
            </>
          ) : (
            <div>No Charger Information available.</div>
          )}
        </div>
    );
};

export default ChragerInfo;