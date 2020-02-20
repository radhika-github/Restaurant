import { FETCH_PRODUCTS } from './actionTypes';
import axios from 'axios';

import { productsAPI } from '../util';

const compare = {
    lowestprice: (a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    },
    highestprice: (a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
    }
};

export const fetchProducts = (filters, sortBy, callback) => dispatch => {
    return axios
        .get(productsAPI, {headers: {'Authorization': 'Bearer Ws2cNlByd9vTbm46IWr_dxWZi_vjDndtFvuegvjo5QKwYOnvs5wfgHMH-FQrxrnE5r5ZhY0OShmgdXWlo79Mc7pVcP6-T__hwd_96Z3YalOZwKdtFJ-7PlGtwHRNXnYx'}})
        // .get(productsAPI)

        .then(res => {
            let { products } = res.data.businesses;
            console.log(res.data.businesses)
            if (!!callback) {
                callback();
            }

            return dispatch({
                type: FETCH_PRODUCTS,
                payload: products
            });
        })
        .catch(err => {
            console.log('Could not fetch products. Try again later.');
        });
};
