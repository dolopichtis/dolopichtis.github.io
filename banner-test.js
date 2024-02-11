function addBanner() {
        let scarcityStudentsSource = 'https://enrollpro.io/scsorg/checkout/getStudentsNumber.php';
        fetch(scarcityStudentsSource).then(studentsData => studentsData.text()).then(studentsNumber => makeBanner(studentsNumber));
}
function makeBanner(students) {
        let body = document.body;
        let banner = document.createElement('div');
        banner.setAttribute('id', 'scarcity-banner');
        let text = document.createElement('h3');
        let message;
        if (students > 0) {
                message = `The number of available places to enroll is ${students} student${students > 1 ? 's' : ''}.`
                let link = document.createElement('a');
                link.setAttribute('href', 'https://enrollpro.io/scsorg/checkout/');
                link.innerHTML = 'Enroll now';
                banner.appendChild(link);
        } else if (students === '0') {
                message = 'Hi! We are full and no longer enrolling students at this time! Be sure to check back next month!';
        } else {
                message ="We are full and no longer enrolling students at this time. Check back soon!";
        }
        text.textContent = message;
        body.prepend(banner);
        banner.prepend(text);
        let head = document.getElementsByTagName('HEAD')[0];
        let cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = 'https://enrollpro.io/scsorg/checkout/banner.css';
        head.appendChild(cssLink);
}
document.addEventListener('DOMContentLoaded', addBanner);
