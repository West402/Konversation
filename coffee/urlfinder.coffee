

isAValidUrl = (message_text) -> 

	link = [] 
	good_links = []
	
	#finds valid urls in text by searching through strings for www and http
	isValidUrl = () ->
		first_occur = 0
		
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




	#checks to see if URL is valid
	url_requester = () ->


		request = require("request")

		#make sure all links are http compatible
		for url, i in link
			do (url) ->  
				if url[0] == "w"
					link[i] = "http://" + url

		#REMOVES duplicates
		len = link.length
		out = []
		obj = {}
		i = 0
		while i < len
		    obj[link[i]] = 0
		    i++
		for i of obj
		    out.push i
		link = out
		console.log link

		
		#hopefully add all good links into new array
		for url, i in link
			do (url) -> 
				request.head url, (error,response) ->
					if !error and response.statusCode == 200
						good_links.push(url)
						console.log good_links
		
			

	url_requester(isValidUrl(message_text))
					
			
	return good_links		



			 













message_text = " hey man check http://www.theatlantic.com/ but however www.swwwwwwwwwytresf.com is solid this www.facebook.com aaaa"

console.log isAValidUrl(message_text)