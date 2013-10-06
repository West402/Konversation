// Generated by CoffeeScript 1.6.1
(function() {
  var articleView, askWhichFriend, bindClickEvents, buidpage, buildConversation, conversation, setAndBindPageSizes, transition;

  conversation = [];

  $(document).ready(function() {
    return buidpage();
  });

  buidpage = function() {
    bindClickEvents();
    transition();
    return setAndBindPageSizes(8);
  };

  transition = function() {
    return $("#firstButton").delay(2000).fadeTo(200, 0).delay(200).fadeTo(0, 0, askWhichFriend);
  };

  askWhichFriend = function() {
    var buildFriends;
    $("#firstButton").text("Please select a conversation...").delay(1000).fadeTo(300, 1).delay(2000);
    buildFriends = function(Friends) {
      var build, friend, _i, _len, _results;
      build = function(thread) {
        var $mostRecent, $name, $thread, getUserInfo, i, recipient, _i, _len, _ref;
        $thread = $("<div/>", {
          "class": "friend",
          id: "" + thread.thread_id
        });
        $mostRecent = $("<div/>", {
          "class": "FmostRECENT",
          text: "" + thread.snippet
        });
        $name = $("<div/>", {
          "class": "friendNAME",
          text: ""
        });
        getUserInfo = function(friend) {
          if ($name.text() === "") {
            $name.text("" + friend.name);
            $thread.append($("<img/>", {
              "class": "friendPIC",
              src: "" + friend.pic_square
            }));
          } else {
            $name.text($name.text() + (" & " + friend.name));
          }
          return $thread.append($name).append($mostRecent);
        };
        _ref = thread.recipients;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          recipient = _ref[i];
          if (("" + recipient) !== ("" + thread.viewer_id)) {
            $.get("/userInfo", {
              uid: recipient
            }, getUserInfo);
          }
        }
        $thread.click(function() {
          return buildConversation(thread.thread_id, thread.viewer_id);
        });
        return $thread;
      };
      _results = [];
      for (_i = 0, _len = Friends.length; _i < _len; _i++) {
        friend = Friends[_i];
        _results.push($(".FRIENDS").append(build(friend)));
      }
      return _results;
    };
    $.get("/allThreads", buildFriends);
    $(".ninja").removeClass("hidden");
    return $(".FRIENDS").hide().delay(800).fadeIn(200);
  };

  buildConversation = function(id, me) {
    var $convo, buildMessages;
    $convo = $(".CONVO");
    $("#firstButton").fadeTo(200, 0);
    $(".FRIENDS").fadeOut(200).addClass("hidden");
    $(".welcome").addClass("moveDown").delay(600).fadeOut(400);
    $(".logo").hide().removeClass("hidden").delay(1000).fadeIn(200, function() {
      return setAndBindPageSizes(10);
    });
    buildMessages = function(conversation) {
      var build, message, _i, _len, _results;
      build = function(message) {
        var $m;
        $m = $("<div/>", {
          "class": "message",
          text: "" + message.body
        });
        if (("" + message.author_id) === ("" + me)) {
          return $m.addClass("to");
        } else {
          return $m.addClass("from");
        }
      };
      _results = [];
      for (_i = 0, _len = conversation.length; _i < _len; _i++) {
        message = conversation[_i];
        _results.push($convo.append(build(message)));
      }
      return _results;
    };
    $.get("/messagesInThread", {
      thread_id: id
    }, buildMessages);
    return $(".CONVO").removeClass("hidden");
  };

  articleView = function() {
    var buildArticles;
    buildArticles = function(Articles) {
      var article, build, _i, _len, _results;
      build = function(article) {
        var $a, $img;
        $a = $("<div/>", {
          "class": "article"
        });
        return $img = $("<img/>", {
          src: "article."
        });
      };
      _results = [];
      for (_i = 0, _len = Articles.length; _i < _len; _i++) {
        article = Articles[_i];
        _results.push(build(article));
      }
      return _results;
    };
    return $.get("/sonething", chatID, build);
  };

  setAndBindPageSizes = function(r) {
    var setSizes;
    setSizes = function() {
      var h;
      h = $(window).height();
      return $(".ninja").height(r * h / 10);
    };
    $(window).bind('resize', function() {
      return setSizes();
    });
    return setSizes();
  };

  bindClickEvents = function() {
    return $(".logo").click(function() {
      var h;
      $(".CONVO").children().remove();
      $(".ninja").height(8 * (h = $(window).height() / 10));
      $(".welcome").removeClass("moveDown").fadeIn(200);
      $(".logo").fadeOut(200);
      return askWhichFriend();
    });
  };

}).call(this);
