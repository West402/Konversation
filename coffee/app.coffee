#assume there is an object
conversation = []

# also assume there is jquery

$(document).ready -> buidpage()

buidpage = () -> 

#	bindClickEvents()
	transition()
	setAndBindPageSizes()


transition = () -> 

	$("#firstButton").delay(2000)
					 .fadeTo(200, 0)
					 .delay(200)
					 .fadeTo(0, 0, askWhichFriend)
###	$(".welcome").removeClass("initial")
				 .addClass("move")
				 .delay(1800)
				 .addClass("second")
###

askWhichFriend = () -> 

	$("#firstButton").text("Please select a conversation...")
					 .delay(1000)
					 .fadeTo(300, 1)
					 .delay(2000)

	$(".ninja").removeClass("hidden")	

	buildFriends = (Friends) ->

		build = (thread) -> 

			console.log thread

			$friend = $("<div/>", class: "friend", id: "#{thread.thread_id}")
			$mostRecent = $("<div/>", class: "FmostRECENT", text: "#{thread.snippet}")
			$name = $("<div/>", class: "friendNAME", text: "")

			getUserInfo = (friend) -> 

				if $name.text() is "" then $name.text("#{friend.name}")
				else $name.text( $name.text() + " & #{friend.name}")
				$pic = $("<img/>", class: "friendPIC", src: "#{friend.pic_square}")
				$friend.append($pic).append($name).append($mostRecent)						

			for recipient in thread.recipients when recipient isnt thread.viewer_id
				console.log "recipient: " + recipient
				console.log "thread.viewer_id: " + thread.viewer_id
				$.get("/userInfo", {uid : recipient}, getUserInfo)

			$friend.click -> null

			return $friend	


		for friend in Friends
			$(".FRIENDS").append( build(friend) )

	$.get("/allThreads", buildFriends)
	
	

buidConversation = () ->

	$convo = $(".CONVO")

	for message in conversation
		$convo.append build(message)


	build = (message) -> 

		$m = $("<div/>", id: "#{message.id}", class: "#{message.direction}", text: "#{message.text}")



setAndBindPageSizes = () -> 

	setSizes = () -> 
		w = $(window).width()
		h = $(window).height()
		$(".ninja").height(8 * h / 10)
		


	$(window).bind 'resize', -> 
		setSizes()

	setSizes()





















