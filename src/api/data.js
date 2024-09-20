import axios from "axios";
import { DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE } from "../redux/dataSlice"; // Import the correct action creators
import { SELECT_DATA_FAILURE, SELECT_DATA_REQUEST, SELECT_DATA_SUCCESS } from "../redux/selectDataSlice";

export const fetchAllTickets = () => async (dispatch) => {
  try {
    dispatch(DATA_REQUEST()); // Use action creator
    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    dispatch(DATA_SUCCESS({ tickets: data.tickets, users: data.users })); // Pass payload correctly
  } catch (error) {
    dispatch(DATA_FAILURE({ error: error?.message || "Error fetching tickets" }));
  }
};

export const filterTickets = (filterType, tickets, sortOrder) => async (dispatch) => {
  try {
    dispatch(SELECT_DATA_REQUEST());
    let isUserFilter = false;
    let filterSet = new Set();
    let filteredList = [];

    switch (filterType) {
      case "status":
        tickets.forEach((ticket) => filterSet.add(ticket.status));
        filteredList = Array.from(filterSet).map((status) => ({
          title: status,
          tickets: tickets.filter((ticket) => ticket.status === status),
        }));
        break;

      case "user":
        isUserFilter = true;
        filteredList = tickets?.allUser?.map((user) => ({
          title: user.name,
          tickets: tickets?.allTickets?.filter((ticket) => ticket.userId === user.id),
        }));
        break;

      default:
        const priorities = ["No priority", "Low", "Medium", "High", "Urgent"];
        filteredList = priorities.map((priority, index) => ({
          title: priority,
          tickets: tickets.filter((ticket) => ticket.priority === index),
        }));
        break;
    }

    if (sortOrder === "title") {
      filteredList.forEach((group) => {
        group.tickets?.sort((a, b) => a.title.localeCompare(b.title));
      });
    } else if (sortOrder === "priority") {
      filteredList.forEach((group) => {
        group.tickets?.sort((a, b) => b.priority - a.priority);
      });
    }

    dispatch(SELECT_DATA_SUCCESS({ filteredList, isUserFilter }));
  } catch (error) {
    dispatch(SELECT_DATA_FAILURE({ error: error?.message || "Error filtering tickets" }));
  }
};
