import axios from 'axios';
import { async } from 'regenerator-runtime';

import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (method, url, upload) {
  try {
    const ajaxPro = axios({
      method,
      url,
      data: upload ? upload : {},
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {
      data: { data },
    } = await Promise.race([ajaxPro, timeout(TIMEOUT_SEC)]);

    return data;
  } catch (error) {
    throw error;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const getReq = axios.get(url);
    const {
      data: { data },
    } = await Promise.race([getReq, timeout(TIMEOUT_SEC)]);

    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const postReq = axios.post(url, uploadData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {
      data: { data },
    } = await Promise.race([postReq, timeout(TIMEOUT_SEC)]);

    return data;
  } catch (error) {
    throw error;
  }
};
*/
