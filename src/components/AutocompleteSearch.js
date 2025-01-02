import React from "react";
//import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";



const AutocompleteSearch = ({ onLoad, handlePlaceSelect, searchQuery, setSearchQuery}) => {
    //const autocompleteRef = useRef(null);

 
    return(
        <div className="absolute top-6
         left-4 right-4">
              <div className="bg-white rounded-full shadow-lg flex items-center p-2">
                <Autocomplete
                  onLoad={onLoad}
                  onPlaceChanged={handlePlaceSelect}
                  className="w-full"
                >
                  <input
                    type="text"
                    placeholder="Search for a location"
                    className="w-full bg-transparent outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Autocomplete>
              </div>
            </div>
    );
};

export default AutocompleteSearch;