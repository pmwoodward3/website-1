export default (...arr) => arr
.filter(x => !!x)
.join('\ ')
