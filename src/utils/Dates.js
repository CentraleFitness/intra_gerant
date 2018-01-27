class Dates {
    static format(timestamp) {
        let today = new Date(timestamp);
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let hh = today.getHours();
        let mn = today.getMinutes();
        let ss = today.getSeconds();
        return (dd > 9 ? dd : ('0' + dd)) + "/" +
            (mm > 9 ? mm : ('0' + mm)) + "/" +
            yyyy + " " +
            (hh > 9 ? hh : ('0' + hh)) + ":" +
            (mn > 9 ? mn : ('0' + mn)) + ":" +
            (ss > 9 ? ss : ('0' + ss));
    }
}

export default Dates;