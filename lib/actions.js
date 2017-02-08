'use strict';

const request = require('request');
const Q = require('q');
const settings = require('../common/settings');
const sonos = require('./sonos');

let actionsHandler = {};

actionsHandler.init = function (req,res,assistant) {

    let body = req.body;
    let action = req.body.result.action;
    let queryParam = "";

    console.log("responding to action: " + action + "......");

    if (action === "play_song_by_artist" || action === "instant_play_song_by_artist" || action === "play_song_title") {
        
        queryParam = (body.result.parameters.artist || "") + " " + body.result.parameters.song;
        playArtistOrSong(queryParam);


    } else if (action === "shuffle_artist") {

        queryParam = body.result.parameters.artist;
        playArtistOrSong(queryParam);

    } else if (action === "play_album") {

        queryParam = body.result.parameters.album;
        playAlbum(queryParam);

    } else if (action === "sonos_play" || action === "sonos_pause" || action === "sonos_next" || action === "sonos_previous"){

        // grab all characters after the "_" for the sonos API endpoint
        let defaultAction = action.slice(action.indexOf("_")+1, action.length);
        executeDefualtSonosAction(defaultAction);

    } else if (action === "sonos_volume_up" || action === "sonos_volume_down") {

        // change volume by 10%
        let direction = (action.indexOf("up") === -1) ? "-10" : "+10";
        executeDefualtSonosAction("volume", direction);
    }

};

/**
 * Private function that requests the "MusicSearch and Play" album
 * @param param
 */
function playAlbum (param) {

    let url = settings.sonosUrl + '/' + settings.zoneName + '/musicsearch/' + settings.musicService + '/album/' + param;
    console.log('Requesting ' + url + ' .......');

    sonos.requestAPI(url)
        .then(function(){
            console.log('Complete.......');
        })
        .catch(function(){
            console.log('Error');
        })
}

/**
 * Private function that requests the "MusicSearch and Play" shuffle artist, play song by artist, or play song
 * @param param
 */
function playArtistOrSong (param) {

    let url = settings.sonosUrl + '/' + settings.zoneName + '/musicsearch/' + settings.musicService + '/song/' + param;
    console.log('Requesting ' + url + ' .......');

    sonos.requestAPI(url)
        .then(function(){
            console.log('Complete.......');
        })
        .catch(function(){
            console.log('Error');
        })
}

/**
 * Run default sonos endpoints that take no parameters
 * @param action
 * @param params
 */
function executeDefualtSonosAction (action,params){

    let url = settings.sonosUrl + '/' + settings.zoneName + '/' + action;
    // add params if need be
    url = (params === undefined) ? url : url + "/" + params;

    console.log('Requesting ' + url + ' .......');

    sonos.requestAPI(url)
        .then(function(){
            console.log('Complete.......');
        })
        .catch(function(error){
            console.log(error);
        })
}


module.exports = actionsHandler;