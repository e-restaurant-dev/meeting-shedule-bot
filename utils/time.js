module.exports = {
    getTimeInterval(time) {
        const dateNow = new Date()
        const year = dateNow.getFullYear()
        const month = dateNow.getMonth()

        const inputTime = time.split('/')

        const day = inputTime[0]
        const hm = inputTime[1].split(':')

        const scheduleTime = new Date(year, month, day, ...hm)

        return scheduleTime.getTime() - dateNow.getTime()
    },

    getScheduleTime(time) {
        const dateNow = new Date()
        const year = dateNow.getFullYear()
        const month = dateNow.getMonth()
    
        const inputTime = time.split('/')
    
        const day = inputTime[0]
        const hm = inputTime[1].split(':')
    
        return new Date(year, month, day, ...hm).toString()
    }
}