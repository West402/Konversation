// Generated by CoffeeScript 1.6.1
(function() {

  window.isAValidUrl = function(message_text) {
    var isValidUrl, link, url_requester;
    link = [];
    window.good_links = [];
    isValidUrl = function() {
      var end_occur, first_occur, _results;
      first_occur = 0;
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
      _results = [];
      while (true) {
        first_occur = message_text.indexOf("http", first_occur);
        if (first_occur === -1) {
          break;
        }
        end_occur = message_text.indexOf(" ", first_occur);
        link.push(message_text.slice(first_occur, +end_occur + 1 || 9e9));
        _results.push(first_occur = end_occur);
      }
      return _results;
    };
    url_requester = function() {
      var i, len, obj, out, request, url, _fn, _i, _j, _len, _len1, _results;
      request = require("request");
      _fn = function(url) {
        if (url[0] === "w") {
          return link[i] = "http://" + url;
        }
      };
      for (i = _i = 0, _len = link.length; _i < _len; i = ++_i) {
        url = link[i];
        _fn(url);
      }
      len = link.length;
      out = [];
      obj = {};
      i = 0;
      while (i < len) {
        obj[link[i]] = 0;
        i++;
      }
      for (i in obj) {
        out.push(i);
      }
      link = out;
      console.log(link);
      _results = [];
      for (i = _j = 0, _len1 = link.length; _j < _len1; i = ++_j) {
        url = link[i];
        _results.push((function(url) {
          return request.head(url, function(error, response) {
            if (!error && response.statusCode === 200) {
              window.good_links.push(url);
              return console.log(window.good_links);
            }
          });
        })(url));
      }
      return _results;
    };
    url_requester(isValidUrl(message_text));
    return window.good_links;
  };

  /*
  
  
  message_text = " hey man check http://www.theatlantic.com/ but however www.swwwwwwwwwytresf.com is solid this www.facebook.com aaaa"
  
  console.log isAValidUrl(message_text)
  */


}).call(this);
