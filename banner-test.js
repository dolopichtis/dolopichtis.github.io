document.addEventListener('DOMContentLoaded', addBanner);

function addBanner() {
    //settings:
        let scarcityStudentsSource = 'https://enrollpro.io/scsorg/checkout/banner/getStudentsAjax.php';
        
    //add
        fetch(scarcityStudentsSource).then(studentsData => studentsData.text()).then(studentsNumber => makeBanner(studentsNumber));
}

function makeBanner(students) {
        let cssSource = 'https://enrollpro.io/scsorg/checkout/banner/banner.css';
    
        let body = document.body;
        let banner = document.createElement('div');
        banner.setAttribute('id', 'scarcity-banner');
        let text = document.createElement('h3');
        let message;
        let link = document.createElement('a');
        banner.appendChild(link);
        link.setAttribute('href', 'https://southlandsonlineschools.com/schedule-a-call/');
        link.innerHTML = 'Book a call';
        if (students > 0) {
                message = `The number of available places to enroll is ${students} student${students > 1 ? 's' : ''}.`;
                link.setAttribute('href', 'https://enrollpro.io/scsorg/checkout/');
                link.innerHTML = 'Enroll now';
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
        cssLink.href = cssSource;
        head.appendChild(cssLink);
        
        //remove button if checkout and students less than 1;
        const isCheckout = document.location.pathname == '/scsorg/checkout/banner-test.php';
        const button = document.querySelector('#submit-button');
        const total = document.querySelector('.cc-cart__total');
        if (isCheckout && students <= 0){
            button.remove();
            banner.setAttribute('class', 'silent');
            total.remove();
        }
}
