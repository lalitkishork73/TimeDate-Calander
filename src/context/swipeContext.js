import React, { createContext, useReducer, useContext } from "react";
import moment from "moment";

const SwipeContext = createContext();

const swipeReducer = (state, action) => {
    switch (action.type) {
        case "SWIPE_PREWEEK":
            return { currentWeek: action.payload };
        case "SWIPE_NXTWEEK":
            return { currentWeek: action.payload };
        default:
            return state;
    }
};

const initialState = { currentWeek: moment() };

const SwipeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(swipeReducer, initialState);

    const goToPreviousWeek = (prev) => {
        dispatch({ type: 'SWIPE_PREWEEK', payload: prev });
    };

    const goToNextWeek = (next) => {
        dispatch({ type: 'SWIPE_NXTWEEK', payload: next });
    };

    return (
        <SwipeContext.Provider value={{ state, goToPreviousWeek, goToNextWeek }}>
            {children}
        </SwipeContext.Provider>
    );
};

export const useSwipe = () => {
    const context = useContext(SwipeContext);
    if (!context) throw new Error("useSwipe must be used within a SwipeProvider");
    return context;
};

export default SwipeProvider;
