// Generated by CoffeeScript 1.6.3
(function() {
  var isAValidUrl, message_text;

  isAValidUrl = function(message_text) {
    var THYHOLYLINKS, getme, isValidUrl, url_requester;
    THYHOLYLINKS = [];
    isValidUrl = function() {
      var end_occur, first_occur, link;
      first_occur = 0;
      link = [];
      while (true) {
        first_occur = message_text.indexOf("www", first_occur);
        if (first_occur === -1) {
          break;
        }
        end_occur = message_text.indexOf(" ", first_occur);
        link.push(message_text.slice(first_occur, +end_occur + 1 || 9e9));
        first_occur = end_occur;
      }
      first_occur = 0;
      while (true) {
        first_occur = message_text.indexOf("http", first_occur);
        if (first_occur === -1) {
          break;
        }
        end_occur = message_text.indexOf(" ", first_occur);
        link.push(message_text.slice(first_occur, +end_occur + 1 || 9e9));
        first_occur = end_occur;
      }
      return link;
    };
    url_requester = function(arr_o_links) {
      var good_links, i, request, url, _fn, _i, _j, _len, _len1, _results;
      request = require("request");
      good_links = [];
      _fn = function(url) {
        if (url[0] === "w") {
          return arr_o_links[i] = "http://" + url;
        }
      };
      for (i = _i = 0, _len = arr_o_links.length; _i < _len; i = ++_i) {
        url = arr_o_links[i];
        _fn(url);
      }
      _results = [];
      for (i = _j = 0, _len1 = arr_o_links.length; _j < _len1; i = ++_j) {
        url = arr_o_links[i];
        _results.push((function(url) {
          return request.head(url, function(error, response) {
            if (!error && response.statusCode === 200) {
              good_links.push(url);
              return getme(good_links, i);
            }
          });
        })(url));
      }
      return _results;
    };
    getme = function(links, i) {
      if (links.length === i - 1) {
        console.log(links);
        return THYHOLYLINKS = links.slice(0);
      }
    };
    url_requester(isValidUrl(message_text));
    return THYHOLYLINKS;
  };

  message_text = " hey man check http://www.theatlantic.com/ but however www.swwwwwwwwwytresf.com is solid this www.facebook.com aaaa";

  console.log(isAValidUrl(message_text));

}).call(this);
