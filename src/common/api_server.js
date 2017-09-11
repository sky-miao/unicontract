import reqwest from 'reqwest';
export  function api(urls,param,data) {
	param=param||{};
	data=data||'';
	console.log(reqwest.toQueryString(param))
	return(
		{
			url: 'http://localhost:8081/'+urls+'?'+reqwest.toQueryString(param),
			// url: 'http://172.17.7.183:8081/'+urls+'?'+reqwest.toQueryString(param),
			method: 'post',
			// contentType:'application/x-www-form-urlencoded',
			// contentType:'application/json',
			headers: {
		    	'token': sessionStorage.token,
		  },
			data:data,
			type: 'json',
		}
	)
}
