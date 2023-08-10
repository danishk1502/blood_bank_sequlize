const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let updateMonth = month + 3;
let updateYear = year
if (updateMonth> 12) {
    updateMonth = updateMonth - 12;
    updateYear = year + 1;
}

exports.activeDate = year + "-" + month + "-" + day;
exports.nextDonation = updateYear + "-" + updateMonth + "-" + day;



