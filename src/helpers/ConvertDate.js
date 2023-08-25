export const ConvertDate = (hour) => {
    if (hour >= 24) {
        let day = Math.floor(hour / 24);
        let d_hour = hour % 24;

        // if (day >= 7) {
        //     let week = Math.floor(day / 7);
        //     let d_day = day % 7;
        //     return `${week} tuần, ${d_day} ngày, ${d_hour} giờ`;
        // }

        if (d_hour > 0) {
            return `${day} ngày, ${d_hour} giờ`;
        }
        return `${day} ngày`;
    }

    return `${hour} giờ`;
};
