#assume there is an object
conversation = []

# also assume there is jquery

$(document).ready -> buidpage()

buidpage = () -> 

#	bindClickEvents()
	transition()

#bindClickEvents = () -> null

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
#					 .fadeTo(200, 0)

	buildFriends = () -> 

		build = (friend) -> 

				$friend = $("<div/>", class: "friend", id: "#{friend.name}")
				$pic = $("<img/>", class: "friendPIC", src: "#{friends.image}")
				$name = $("<div/>", class: "friendNAME", text: "#{friend.name}")
				$mostRecent = $("<div/>", class: "FmostRECENT", text: "#{friend.mostRecent}")
				$friend.append($pic).append($name).append($mostRecent)


		for friend in Friends
			FRIENDS.append( build(friend) )

		

buidConversation = () ->

	$convo = $(".CONVO")

	for message in conversation
		$convo.append build(message)


	build = (message) -> 

		$m = $("<div/>", id: "#{message.id}", class: "#{message.direction}", text: "#{message.text}")



setAndBindPageSizes = () -> 

	setSize = () -> 

		w = $(window).width()
		$(".CONVO").width()


	$(window).bind 'resize', -> 
		setSize()

	setSize()





















