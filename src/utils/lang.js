export function camelize(str){
  return str.replace(/-(\w)/g, toUpper)
}

function toUpper (_, c){
  return c ? c.toUpperCase() : ''
}

export function JSONToParams(obj){
  if(!obj) return ''
  let res = ''
  for(let key in obj){
    let value = obj[key]
    if(Object.prototype.hasOwnProperty.call(obj, key) && value){
      res += '&' + key + '=' + obj[key]
    }
  }
  return res.substring(1)
}