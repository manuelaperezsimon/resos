"use client";
import useApi from "@/hooks/useApi";
import Restaurant from "@/interfaces/interfaces";
import { Alert, Grid } from "@mui/material";

import { purple } from "@mui/material/colors";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import RestaurantDetails from "@/components/RestaurantDetails/RestaurantDetails";

const apiURL = process.env.REACT_APP_API_URL as string;
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop: "100px",
  borderColor: purple[900],
};

const RestaurantsList = () => {
  const { getAllItems } = useApi();
  const [restaurants, setrestaurants] = useState([] as Restaurant[]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const restaurantsList = useCallback(async () => {
    setIsLoading(true);
    const result = await getAllItems("http://localhost:4000/restaurants");

    if (result) {
      setErrorMessage("");
    } else {
      setErrorMessage("Is not possible to get the list of restaurants.");
    }
    setrestaurants(result as Restaurant[]);
    setIsLoading(false);
  }, [getAllItems]);

  useEffect(() => {
    restaurantsList();
  }, [restaurantsList]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {errorMessage && (
        <Alert
          severity="error"
          style={{
            width: "fit-content",
          }}
          sx={{ marginTop: 7 }}
        >
          {errorMessage}
        </Alert>
      )}
      {isLoading && (
        <ClipLoader
          color="red"
          loading={isLoading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      <Grid
        container
        spacing={10}
        sx={{
          padding: 6,
        }}
      >
        {restaurants?.length > 0 &&
          restaurants?.map((restaurant) => (
            <RestaurantDetails restaurant={restaurant} />
          ))}
      </Grid>
    </div>
  );
};

export default RestaurantsList;
