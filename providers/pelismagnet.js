var async   = require('async');
var magnet  = require('magnet-uri');
var util    = require('util');

var network = require('../network');

// ----------------------------------------------------------------------------

var PELISMAGNET_URL = 'http://pelismag.net'

// ----------------------------------------------------------------------------

exports.movie = function(movieInfo, callback) {
    var magnets = [];
    network.json(PELISMAGNET_URL + '/api', { keywords: movieInfo.title, sort_by: 'date_added', limit: 50, page: 0 }, null, function(err, list) {
        if (err) {
            callback(null, magnets);
        } else {
            var magnetList = list.filter(function(magnet) { return magnet.id == movieInfo.tmdb_id; });
            for (var i = 0; i < magnetList.length; i++) {
                magnet = magnetList[i]

                var sources = ['M1080', 'M720'];
                sources.forEach(function(item) {
                    source = magnet.magnets[item];
                    if (source.magnet != null)
                    {
                        var magnetInfo = {
                            title:  util.format('%s (%s, castellano)', magnet.nom, source.quality),
                            source: 'Pelismagnet',
                            size:   magnet.data.sec,
                            seeds:  source.peers,
                            peers:  0,
                            link:   source.magnet
                        };
                        magnets.push(magnetInfo);
                    }
                });
            }
            callback(null, magnets);
        }
    });
}
