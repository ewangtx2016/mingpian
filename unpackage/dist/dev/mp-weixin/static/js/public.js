
// 格式化时间  20180305
function RETURN_NEWTIME(date){
	let time = date ? new Date(date) : new Date() //如果有时间 返回格式化时间 如果没有 则返回当前时间
	let year = time.getFullYear()
	let month = time.getMonth() >= 9 ? time.getMonth() + 1 : '0'+(time.getMonth()+1)
	let day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
	let newDate = `${year}${month}${day}`
	return newDate
}


// 格式化时间  2018-03-05 09:08:03
function RETURN_NEWTIME_X(date, type){
	let time = date ? new Date(date) : new Date() //如果有时间 返回格式化时间 如果没有 则返回当前时间
	let year = time.getFullYear()
	let month = time.getMonth() >= 9 ? time.getMonth() + 1 : '0'+(time.getMonth()+1)
	let day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()
	let hours = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()
	let minu = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()
	let newDate = `${year}-${month}-${day}  ${hours}:${minu}`
	return newDate
}

// 公共的get方法
function GET(obj){
	let storage = uni.getStorageSync('CODE')
	return new Promise((resolve, reject)=>{
		uni.request({
			url: obj.url,
			header: {
				'Cookie': `ticket=${storage.ticket}`
			},
			data: obj.data,
			success:function(data){
				if(data.data.status === 1){
					resolve(data.data.data)
				}else{
					reject(data)
				}
			}
		})
	})
}









module.exports = {
	RETURN_NEWTIME,
	GET,
	RETURN_NEWTIME_X
}