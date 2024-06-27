//Listens to UneeQ events, acts on them as needed
window.addEventListener( 'UneeqMessage', (event) => {
    const msg = event.detail;
    switch( msg.uneeqMessageType ) {
        case 'AvatarQuestionText':
            trackAlexAI();
            break;
       default:
            break;
    }
});

function trackAlexAI() {
    const current_time = Math.floor(Date.now() / 1000);
    console.log('------> Tracked Alex AI interact, timestamp = ' + current_time );
    setNauticEdCookie('alexai_interact_timestamp', current_time );
    setNauticEdCookie('alexai_interact_domain', getCurrentHostVar() );
}

function getCurrentHostVar() {
    const real_host = window.location.hostname;
    switch (real_host) {
        case 'boating-knowledge.nauticed.org':
            return 'alex-bk';
        case 'sailing-blog.nauticed.org':
            return 'alex-blog';
        case 'www.nauticed.org':
            return 'alex-ned';
        case 'test.nauticed.org':
        case 'trunk.nauticed.org':
            return 'alex-ned-test';
        default:
            return real_host;
    }
}

function setNauticEdCookie(name, value, options = {}) {
    const prefix = AlexAIVariables ? AlexAIVariables.prefix : '';
    options = {
        path: '/',
        domain: '.nauticed.org',
        'max-age': 86400,
        secure: true,
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(prefix+name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
