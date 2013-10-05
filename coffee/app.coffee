#assume there is an object
conversation = []

# also assume there is jquery

$(document).ready -> buidpage()

buidpage = () -> 

	bindClickEvents()




bindClickEvents = () -> 

	$("#firstButton").click -> askWhichFriend()


askWhichFriend = () -> 

	$(".welcome").addClass("moveUp")


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





















