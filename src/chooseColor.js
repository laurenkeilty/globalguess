import React, {}from 'react';
import countries from './data/countries.json';

//chooses an rgb color string to return based off the distance given, larger distances give lighter yellow colors
//which gradient to red as the distances get closer to zero. Distances cannot be negative.
export default function chooseColor(distance) {

    let color;

    if(distance < 0.1) {
        color = 'rgb(128, 1, 1)';
    }
    else if (distance < 50) {
        color = 'rgb(171, 5, 5)';
    }
    else if (distance < 100) {
        color = 'rgb(204, 31, 8)';
    }
    else if (distance < 300) {
        color = 'rgb(201, 73, 14)';
    }
    else if (distance < 500) {
        color = 'rgb(214, 84, 24)';
    }
    else if (distance < 700) {
        color = 'rgb(232, 109, 32)';
    }
    else if (distance < 900) {
        color = 'rgb(237, 119, 45)';
    }
    else if (distance < 1000) {
        color = 'rgb(237, 128, 45)';
    }
    else if (distance < 1200) {
        color = 'rgb(237, 128, 45)';
    }
    else if (distance < 1400) {
        color = 'rgb(237, 128, 45)';
    }
    else if (distance < 1600) {
        color = 'rgb(237, 128, 45)';
    }
    else if (distance < 1800) {
        color = 'rgb(250, 139, 55)';
    }
    else if (distance < 2000) {
        color = 'rgb(247, 147, 47)';
    }
    else if (distance < 2400) {
        color = 'rgb(250, 152, 55)';
    }
    else if (distance < 2800) {
        color = 'rgb(250, 162, 55)';
    }
    else if (distance < 3200) {
        color = 'rgb(250, 169, 55)';
    }
    else if (distance < 3600) {
        color = 'rgb(250, 178, 55)';
    }
    else if (distance < 4000) {
        color = 'rgb(250, 182, 55)';
    }
    else if (distance < 4500) {
        color = 'rgb(250, 188, 55)';
    }
    else if (distance < 5000) {
        color = 'rgb(250, 198, 55)';
    }
    else if (distance < 5500) {
        color = 'rgb(250, 205, 55)';
    }
    else if (distance < 6000) {
        color = 'rgb(250, 214, 55)';
    }
    else if (distance < 6500) {
        color = 'rgb(250, 224, 55)';
    }
    else if (distance < 7000) {
        color = 'rgb(250, 230, 55)';
    }
    else if (distance < 7500) {
        color = 'rgb(250, 230, 55)';
    }
    else if (distance < 8000) {
        color = 'rgb(252, 233, 66)';
    }
    else if (distance < 9000) {
        color = 'rgb(252, 236, 88)';
    }
    else if (distance < 10000) {
        color = 'rgb(252, 240, 121)';
    }
    else {
        color = 'rgb(252, 243, 144)';
    }

    return color
}