import axios from 'axios';
import { ADD_FETCHED_DATA, ADD_SEARCHED_DATA, ADD_CATEGORY_DATA } from './types.js';

const apiUrl = "http://localhost:8765/api/";

export const setPranks = (pranks, type) => {
  return {
    type: type,
    payload: pranks,
  };
};

export const fetchCategories = (slugs) => {
    var categoryUrl = apiUrl + "categories.json?slugs=" + slugs.join(",");

    return (dispatch) => {
        return axios.get(categoryUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({type: ADD_CATEGORY_DATA, payload: data});
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchPranks = (slug, keyword) => {
    var prankUrl = apiUrl + "pranks.json";

    if (slug) {
        prankUrl += "?slug=" + slug;
    }

    if (keyword) {
        prankUrl += (slug ? "&" : "?") + "keyword=" + keyword;
    }

    return (dispatch) => {
        return axios.get(prankUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({type: (typeof keyword == 'string' ? ADD_SEARCHED_DATA : ADD_FETCHED_DATA), payload: data});
            })
            .catch(error => {
                throw (error);
            });
    };
};
