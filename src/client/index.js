import { preformAddTripp } from './js/geoNames'
import { getCounterDays, getTrippDuration } from './js/helper'
import { postDataToServer } from './js/utility'
import { getWeatherInLocation } from './js/weatherBit'
import { getPixabayForLocation } from './js/pixabay'

import './styles/containers.scss'
import './styles/links.scss'
import './styles/style.scss'

import html from './views/index.html';

import logoPlane from './media/logo_plane.jpg';
import logoSmall from './media/logo_xsmall.jpg';


export {
    preformAddTripp,
    postDataToServer,
    getWeatherInLocation,
    getPixabayForLocation,
    getCounterDays,
    getTrippDuration
}