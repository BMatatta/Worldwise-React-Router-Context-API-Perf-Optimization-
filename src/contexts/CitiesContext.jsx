import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://api.jsonbin.io/v3/b/67d0a4e38561e97a50ea2939";

const initialState = {cities: [], isLoading: false, currCity: {}, error: ""};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {...state, isLoading: true};
    case "city/loaded":
      return {...state, isLoading: false, currCity: action.payload};
    case "cities/loaded":
      return {...state, isLoading: false, cities: action.payload};
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currCity: {},
      };
    case "rejected":
      return {...state, isLoading: false, error: action.payload};
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({children}) {
  const [{cities, isLoading, currCity, error}, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({type: "loading"});
      try {
        // const res = await fetch(`${BASE_URL}/cities`);
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        dispatch({type: "cities/loaded", payload: data});
      } catch {
        dispatch({type: "rejected", payload: "Error loading data"});
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currCity.id) return;

      dispatch({type: "loading"});
      try {
        // const res = await fetch(`${BASE_URL}/cities/${id}`);
        const res = await fetch(`${BASE_URL}/${id}`);
        const data = await res.json();
        dispatch({type: "city/loaded", payload: data});
      } catch {
        dispatch({type: "rejected", payload: "Error loading data"});
      }
    },
    [currCity.id]
  );

  async function createCity(newCity) {
    dispatch({type: "loading"});
    try {
      // const res = await fetch(`${BASE_URL}/cities`, {
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type: "cities/created", payload: data});
    } catch {
      dispatch({type: "rejected", payload: "Error creating data"});
    }
  }

  async function deleteCity(id) {
    dispatch({type: "loading"});
    try {
      await fetch(`${BASE_URL}/${id}`, {
        // await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type: "cities/deleted", payload: id});
    } catch {
      dispatch({type: "rejected", payload: "Error deleting data"});
    }
  }

  return (
    <CitiesContext.Provider
      value={{cities, isLoading, currCity, getCity, createCity, deleteCity}}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context used outside provider");
  return context;
}

export {CitiesProvider, useCities};
