import React from 'react';

export function handleAxiosError(err) {
    console.error('handleAxiosError received:', err);
    let msg = '';

    console.log('err.response.data', err.response.data);

    if (err.response) msg = err.response.data;
    else if (err.request) msg = 'No response';
    else msg = err.message;

    return msg;
}