import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

import SearchIcon from "@mui/icons-material/Search";

const options = ["Option 1", "Option 2"];

export default function ControllableStates() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        popupIcon={
          <SearchIcon
            style={{
              fill: "white",
              backgroundColor: "#16a34a",
              borderRadius: "20px",
              width: "28px",
              height: "28px",
            }}
          />
        }
        sx={{
          width: 645,
          [`& .${autocompleteClasses.popupIndicator}`]: {
            transform: "none",
          },
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          "& .MuiInputBase-root": {
            // Style for input label
            fontSize: "20px", // Font size
            fontWeight: 600, // Font weight
            color: "#919191",
          },
          ".MuiAutocomplete-inputFocused": {
           maxWidth: "90%",
          },
        "@media (max-width: 767px)":{
          width:"357px"
        }
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
              }
            }}
            {...params}
            InputLabelProps={{ shrink: true }}
            placeholder="Enter a country, town or city"
          />
        )}
      />
    </div>
  );
}
