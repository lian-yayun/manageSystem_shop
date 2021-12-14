/**
 * Created by syp on 2020/5/15.
 */
 
 exports.install = function (Vue, options) {
  Vue.prototype.formatDate = function (row, column) {
    let data = row[column.property]
    if (data == null) {
      return null
    }
    let dt = new Date(data)
    let yyyy = dt.getFullYear()
    let MM = (dt.getMonth() + 1).toString().padStart(2, '0')
    let dd = dt.getDate().toString().padStart(2, '0')
    let h = dt.getHours().toString().padStart(2, '0')
    let m = dt.getMinutes().toString().padStart(2, '0')
    let s = dt.getSeconds().toString().padStart(2, '0')
    return yyyy + '-' + MM + '-' + dd + ' ' + h + ':' + m + ':' + s
  }
}