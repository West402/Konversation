#assume there is an object
conversation = []

# also assume there is jquery

$(document).ready -> buidpage()

buidpage = () -> 

#	bindClickEvents()
	askWhichFriend()

#bindClickEvents = () -> null



askWhichFriend = () -> 

	$(".welcome").delay(2000).removeClass("initial").addClass("move").delay(1800).addClass("second")


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





















