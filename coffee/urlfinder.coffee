

isAValidUrl = (message_text) -> 

	THYHOLYLINKS = []

	#finds valid urls in text by searching through strings for www and http
	isValidUrl = () ->
		first_occur = 0
		link = []
		while true
			first_occur = message_text.indexOf "www", first_occur		
			if first_occur == -1
				break
			end_occur = message_text.indexOf " ", first_occur
			link.push message_text[first_occur..end_occur]
			first_occur = end_occur
			
		first_occur = 0
		while true
			first_occur = message_text.indexOf "http", first_occur		
			if first_occur == -1
				break
			end_occur = message_text.indexOf " ", first_occur
			link.push message_text[first_occur..end_occur]
			first_occur = end_occur
		return link


	#checks to see if URL is valid
	url_requester = (arr_o_links) ->


		request = require("request")

		good_links = []
		
		#make sure all links are http compatible
		for url, i in arr_o_links
			do (url) ->  
				if url[0] == "w"
					arr_o_links[i] = "http://" + url
		
		#hopefully add all good links into new array
		for url, i in arr_o_links
			do (url) -> 
				request.head url, (error,response) ->
					if !error and response.statusCode == 200
						good_links.push(url)
						getme(good_links, i)


	getme = (links, i)  -> 

		if links.length is i-1
			console.log links
			THYHOLYLINKS = links.slice(0)

	url_requester(isValidUrl(message_text))
					
			
	return THYHOLYLINKS		



			 













message_text = " hey man check http://www.theatlantic.com/ but however www.swwwwwwwwwytresf.com is solid this www.facebook.com aaaa"

console.log isAValidUrl(message_text)