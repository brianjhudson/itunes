angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    var baseURL = "https://itunes.apple.com/search?term=";
    var callback = "&callback=JSON_CALLBACK";
    this.getSongData = function(searchTerm) {
      return $http.jsonp(baseURL + searchTerm + callback).then(function(results) {
        var allSongData = results.data.results;
        return allSongData;
      })
    }
    this.parseData = function (allSongData) {
      var parsedSongData = [];
      for (var i = 0; i < allSongData.length; i++) {
        var song = allSongData[i];
        var parsedSong = {};
        for (var prop in song) {
          if (['trackName', 'previewUrl', 'artistName', 'collectionName', 'collectionPrice', 'primaryGenreName', 'artworkUrl60', 'trackPrice'].indexOf(prop) !== -1) {
            parsedSong[prop] = song[prop];
          }
        }
        parsedSongData.push(parsedSong);
      }
      return parsedSongData;

    }
});
