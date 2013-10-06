

isImage = (url) ->
	#npm install request
	request = require("request")

	request.head url, (error, response) ->
		headers = response.headers
		for key, value of headers
			if key is 'content-type'
				if value[0..4] is'image'
					return  true	



