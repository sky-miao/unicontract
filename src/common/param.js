import $ from 'jquery';
export  function param(data) {
	var timestamp=new Date().getTime()
	var base={
		"sign":12,
		"timestamp":timestamp,
	}
	var obj=$.extend( base, data)
	console.log(obj)
	return obj
}
