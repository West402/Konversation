
validateUrl = (message) ->

	request = require("request")

	links = []
	finalLinks = []

	first_occur = 0
	
	while true

		first_occur = message.indexOf("www", first_occur)

		if first_occur == -1 then break

		end_occur = message.indexOf(" ", first_occur)
		
		links.push message[first_occur..end_occur]
		
		first_occur = end_occur
		
	first_occur = 0
	
	while true

		first_occur = message.indexOf("http", first_occur)	
	
		if first_occur == -1 then break

		end_occur = message.indexOf(" ", first_occur)
		
		links.push message[first_occur..end_occur]
		
		first_occur = end_occur

	for url, i in links
		if url[0] == "w"
			links[i] = "http://" + url

	return links
