'use strict';

let sonos = {};
const request = require('request');
const Q = require('q');

/**
 * Fetch sonos API
 * @param url Sonos API endpoint url
 * @returns {*}
 */
sonos.requestAPI = function (url) {

    let deferred = Q.defer();

    request.get(url,

        function (err, response, body) {

            if (err) {
                deferred.reject(err);
            } else {

                body = JSON.parse(body);

                // body is the decompressed response body
                console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
                console.log('the decoded data is: ' + JSON.stringify(body));

                if (body.status === "success") deferred.resolve(body);

                deferred.resolve(body);
            }

        });

    return deferred.promise;

};

module.exports = sonos;