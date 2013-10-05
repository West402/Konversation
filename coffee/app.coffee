#assume there is an object
conversation = []

# also assume there is jquery

$(document).ready -> buidpage()

buidpage = () -> 

	bindClickEvents()




bindClickEvents = () -> 

	$("#firstButton").click -> facebookLogin()


facebookLogin = () -> 

	some_condition_is_met = true

	if some_condition_is_met
		askWhichFriend()
	else
		display_login_info()


askWhichFriend = () -> 

	$(".welcome").addClass("moveUp")


display_login_info = () -> 

	$("#firstButton").fadeOut(100)

	# $("<form/>")

	tryLogin = () -> null


	loginFailed = () -> null


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





















