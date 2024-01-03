import React, {}from 'react';
import countries from './data/countries.json';

export default function chooseColor(distance) {

    let color;

    if(distance < 0.1) {
        color = 'rgb(128, 1, 1)';
    }
    else if (distance < 10) {
        color = 'rgb(171, 5, 5)';
    }
    else if (distance < 50) {
        color = 'rgb(204, 31, 8)';
    }
    else if (distance < 100) {
        color = 'rgb(201, 73, 14)';
    }
    else if (distance < 200) {
        color = 'rgb(214, 84, 24)';
    }
    else if (distance < 300) {
        color = 'rgb(232, 109, 32)';
    }
    else if (distance < 400) {
        color = 'rgb(237, 119, 45)';
    }
    else if (distance < 500) {
        color = 'rgb(237, 128, 45)';
    }
    else if (distance < 700) {
        color = 'rgb(237, 128, 45)';
    }
    else if (distance < 900) {
        color = 'rgb(237, 128, 45)';
    }
    else if (distance < 1100) {
        color = 'rgb(237, 128, 45)';
    }
    else {
        color = 'rgb(247, 255, 161)';
    }

    return color
}