
export const getFormattedTodayDateTime=()=> {
    const date = new Date();

    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const hours24 = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const hours12 = hours24 % 12 || 12;
    const ampm = hours24 >= 12 ? "pm" : "am";

    const daySuffix = getDaySuffix(day);

    return `${day}${daySuffix} ${month} ${year} ${hours12}:${minutes} ${ampm}`;
}

function getDaySuffix(day:any) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}