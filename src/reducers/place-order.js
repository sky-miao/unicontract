
export default (state = {
  productCategory: [],
  goodsName: '',
  supplier: '',
  num: '',
  purchasePrice: '',
}, action) => {
  const {
    type,
    ...other,
  } = action
  switch(type){
    case 'SUBMIT':
      return {
        ...state,
        ...other,
      }
    case 'RESET':
      return {
        ...state,
        ...other,
      }
    default:
      return state
  }
}