let AlexAI = {
    live: false,
    state: '',
    titleText: '<h3 style="text-align: center;">Helpful Info and Suggested Links</h3><p style="text-align: center;">- <a href="https://www.nauticed.org/two-free-sailing-courses?utm_source=nauticed&utm_medium=website&campaign=alex" target="_blank" rel="noopener">Sign up for 2 FREE courses</a> -</p>',
    currentQuestion: '',
    mapOfKeyWords: new Map(),
}

loadAlexKeywords();

// Handle AlexButton click function
jQuery(document).ready(function() {
    jQuery('.alex-activate').click(function(e) {
        e.preventDefault();
        showAlexAIWindow();
    });
    jQuery('.alex-question').click(function(e) {
        e.preventDefault();
        askQuestionInWindow($(this).text());
    });
});

const initLoaderHandler = AlexAIVariables === undefined || AlexAIVariables.initLoadHandler;
const chainId = AlexAIVariables === undefined ? '' : AlexAIVariables.chainId;
const displayCallToAction = AlexAIVariables === undefined || AlexAIVariables.showCTA;

console.log(AlexAIVariables);

// main Alex AI script
window.uneeqInteractionsOptions = {

    "personaShareId": "ffc3c82a-ca29-4c64-9ea2-287d57c23f0b",

    "displayCallToAction": displayCallToAction,

    "renderContent": true,

    "customStyles": ".settings-btn { display: none; }",

    "enableTransparentBackground": false,

    "playWelcome": true,

    "mobileViewWidthBreakpoint": 900,

    "backgroundImageUrl": "",

    "layoutMode": "fullScreen",

    "enableMicrophone": true,

    "showUserInputInterface": true,

    "voiceInputMode": "SPEECH_RECOGNITION",

    "autoStart": false,

    "containedAutoLayout": true,

    "initLoadHandler": initLoaderHandler,

    "languageStrings": {

        "default": {

            "callToActionText": "Hi, I'm Alex the sailing AI. Please ask any sailing or NauticEd question",

            "errorText": "An error occurred.",

            "textInputPlaceholder": "Type here...",

            "sendQuestionButtonToolTip": "Send Message",

            "startRecordingButtonToolTip": "Start Recording",

            "microphonePermissionBlockedButtonToolTip": "Microphone permission blocked",

            "recordingTapToStart": "Tap to record, tap again to send",

            "recordingSpeakNowPrompt": "Speak now",

            "recordingTapStopWhenDone": "Tap stop when done",

            "recordingStopButtonToolTip": "Stop Recording",

            "recordingRequestingMicrophonePrompt": "Requesting Microphone",

            "settingsExitButton": "Exit",

            "confirmExitDescription": "Are you sure you want to exit?",

            "confirmExitStayButton": "STAY",

            "confirmExitEndButton": "EXIT",

            "hideContentButton": "Hide Content",

            "hideDigitalHumanButton": "Hide Digital Human"

        }

    },

    "speechToTextLocales": "en-US:en-AU",

    "customData": {

        "locale": "en-US",

        "personaOverrides":'[{"header":"chainId","value":"'+chainId+'"}]',

    }

}

//Listens to UneeQ events, acts on them as needed
window.addEventListener( 'UneeqMessage', (event) => {
    const msg = event.detail;
    console.log('-- UneeqMessage = ' + msg.uneeqMessageType, msg);
    switch( msg.uneeqMessageType ) {

        case 'AvatarQuestionText':
            //Display the question so the user can see it
            displayQuestion(msg.question);
            break;

        case 'AvatarAnswer':
            //Process the answer, looking for URLS
            processAnswer(msg.answer);
            break;

        case 'SessionStateUpdate':
            sessionIsUpdated(msg);
            break;

        case 'CallToActionDismissed':
            disableCTADisplay();
            break;

        case 'ReadyToStart':

            break;

        default:
            break;
    }

});


function loadAlexKeywords() {
    const keywordsScript = document.createElement('script');
    keywordsScript.src = '/js/alex-ai/alex_ai_01_keywords.js';
    document.head.appendChild(keywordsScript);
}

function getQuestionText(question) {
    let header = '';
    // output the question in the dialog box
    if (AlexAI.currentQuestion !== '') {
        header += "<p><b>Question:</b> <span class='question_txt'>" + AlexAI.currentQuestion + "</span></p>";
    }
    return header;
}

function displayQuestion(question) {
    console.log('DISPLAY QUESTION: '+question);
    AlexAI.currentQuestion = question;
    uneeqUpdateDisplayContent(AlexAI.titleText + getQuestionText(question));
}

function enableWelcomePlay() {
    if (!window.uneeqInteractionsOptions.playWelcome) {
        console.log('WelcomePlay - ON');
        window.uneeqInteractionsOptions.playWelcome = true;
        uneeq.postToFrame('uneeqInteractionsOptions', window.uneeqInteractionsOptions);
    }
}

function disableWelcomePlay() {
    if (window.uneeqInteractionsOptions.playWelcome) {
        console.log('WelcomePlay - OFF');
        window.uneeqInteractionsOptions.playWelcome = false;
        uneeq.postToFrame('uneeqInteractionsOptions', window.uneeqInteractionsOptions);
    }
}

function enableCTADisplay() {
    setNauticEdCookie('alexai_settings_is_hidden', 0);
    if (!window.uneeqInteractionsOptions.displayCallToAction) {
        console.log('displayCallToAction - ON');
        window.uneeqInteractionsOptions.displayCallToAction = true;
        uneeq.postToFrame('uneeqInteractionsOptions', window.uneeqInteractionsOptions);
    }
    if ($("input#alexai_show_switcher").length) {
        $("input#alexai_show_switcher").prop('checked', true);
    }
    setTimeout(function() {
        $('#uneeqFrame').width(400);
    }, 1500);
}

function disableCTADisplay() {
    setNauticEdCookie('alexai_settings_is_hidden', Math.floor((new Date()).getTime() / 1000));
    if (window.uneeqInteractionsOptions.displayCallToAction) {
        console.log('displayCallToAction - OFF');
        window.uneeqInteractionsOptions.displayCallToAction = false;
        uneeq.postToFrame('uneeqInteractionsOptions', window.uneeqInteractionsOptions);
    }
    if ($("input#alexai_show_switcher").length) {
        $("input#alexai_show_switcher").prop('checked', false);
    }
}

// Displays the URL if one is spoken
function processAnswer(answer) {
    console.log('-------- processAnswer -------- ');
    console.log('--- q: ' + AlexAI.currentQuestion);

    let html = AlexAI.titleText;
    if (!AlexAI.currentQuestion) {
        uneeqUpdateDisplayContent(html);
        return;
    }

    html += getQuestionText(AlexAI.currentQuestion);

    console.log("-- checking urls in answer");
    let urls = getLinksFromAnswer(answer);
    if (urls != null && urls.length > 0) {
        console.log('found urls in answer: ' + urls.length);
        for (let i in urls) {
            html += "<a class='alex-link' href=\"" + createTrackedLink(urls[i]) + "\">" + urls[i] + "</a><br>"
        }
    }

    console.log("-- checking keywords");
    const filteredURLs = getLinksByKeywords(answer);
    for (const keyWord of filteredURLs.entries()) {
        html += "<p>" + keyWord[1][2] +" <a class='alex-link' href=\"" + createKeywordLink(keyWord[1][3], keyWord[1][0]) + "\" target=\"_blank\">" + keyWord[1][1] + "</a></p>"
    }

    uneeqUpdateDisplayContent(html);
}

function createTrackedLink(url) {
    const urlWithParams = new URL(url);

    if (AlexAIVariables.utm_source) {
        urlWithParams.searchParams.set("utm_source", AlexAIVariables.utm_source);
    }
    if (AlexAIVariables.utm_medium) {
        urlWithParams.searchParams.set("utm_medium", AlexAIVariables.utm_medium);
    }
    if (AlexAIVariables.utm_campaign) {
        urlWithParams.searchParams.set("utm_campaign", AlexAIVariables.utm_campaign);
    }
    urlWithParams.searchParams.set("utm_content", 'alex-link');

    return urlWithParams.href;
}

function createKeywordLink(keyword, url) {
    const urlWithParams = new URL(createTrackedLink(url));
    urlWithParams.searchParams.set("utm_term", keyword);

    return urlWithParams.href;
}

function hideAlexCTA() {
    console.log('hideAlexCTA()');
    disableAlexAI();
}

function enableAlexAI() {
    console.log("enableAlexAI() - START");
    setNauticEdCookie('alexai_settings_is_hidden', 0);
    $('#uneeqContainedLayout').removeClass('hidden');

    console.log('Current state: '+uneeq.sessionState);
    console.log("enableAlexAI() - END");
}

function disableAlexAI() {
    console.log("disableAlexAI() - START");
    setNauticEdCookie('alexai_settings_is_hidden', Math.floor((new Date()).getTime() / 1000));
    $('#uneeqContainedLayout').addClass('hidden');
    removeTrainingMessage();
    console.log('Current state: ' + uneeq.sessionState);
    if (uneeq && uneeq.sessionState === 'Live') {
        console.log('uneeqEndSession');
        uneeqEndSession();
    }
    console.log("disableAlexAI() - END");
}

function showAlexAIWindow() {
    console.log('activateAlexAIWindow() clicked');
    if (uneeq === undefined) {
        console.log('uneeq is undefined - ERROR');
        return false;
    }
    if (uneeq.sessionState !== 'Live') {
        console.log('uneeqStartSession()');
        uneeqStartSession();
    } else {
        console.log('SESSION IS ALREADY LIVE');
    }
}

function sessionIsUpdated(msg) {
    if ( !AlexAI.live && msg.live && AlexAI.currentQuestion ) {
        console.log('uneeqAsk: ' + AlexAI.currentQuestion);
        uneeqAsk(AlexAI.currentQuestion);
    }
    if ( !AlexAI.live && msg.live ) {
        showTrainingMessage();
    }
    if( !msg.live ) {
        removeTrainingMessage();
    }

    AlexAI.state = msg.state;
    AlexAI.live = msg.live;

    if (msg.state === 'WaitingToStart') {
        showSpinner();
    } else {
        hideSpinner();
    }
    if (msg.state === 'Ended') {
        console.log('CLEAR QUESTION ');
        displayQuestion('');
        enableWelcomePlay();
    }
}

function askQuestionInWindow(question) {
    console.log('askQuestionInWindow() clicked');
    if (AlexAI.live) {
        uneeqAsk(question);
    } else {
        displayQuestion(question);
        disableWelcomePlay();
        showAlexAIWindow();
    }

}

function showTrainingMessage() {
    const alexSection = document.querySelector('#trainingMessage');
    if (alexSection) {
        return;
    }
    /* Display HTML markup start */
    const htmlAlexSection = `
        <div id="trainingMessage" style="z-index: 999999; position: fixed; left: 5%; top: 5%; color: white; width: 90%;">
          <h1 style="color:white; text-align: left; text-transform: none;" class="alex_title">Help Train Alex the AI</h1>
          <div style="color:white; text-align: left;" class="alex_subtitle">Alex will get better with your feedback</div>
          <a href="https://boating-knowledge.nauticed.org/alex-sailing-ai/" class="alex_readmore" style="color: #ff5200; text-align: left; margin-top: 10px; border-radius: 4px; text-decoration:none; display: inline-block;" target="_blank">Help Train Alex...</a>
          <div class="exit-btn" style="cursor:pointer; margin-top: 30px; background: #0e0e0e; display: inline-flex; align-items: center; justify-content: center; height: 30px; width: 30px; padding: 5px; border-radius: 50%; position: absolute; right: 0; top: 0;">&#x2716;</div>
          <style>
            @media only screen and (max-width: 980px) {
                .alex_readmore { background: #ff5200 !important; color: white !important; padding: 8px; margin-top: 0 !important; }
                .exit-btn { margin-top: 0 !important; }
                .alex_title, .alex_subtitle { display:none; }
                #trainingMessage { top: 3% !important; }
            }
          </style>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', htmlAlexSection);
    hideSpinner();
    /* Display HTML markup end */
    jQuery('.exit-btn').on('click', function() {
        closeAlexWindow();
    });
}

function closeAlexWindow() {
    uneeqEndSession();
    showAlexAIFeedbackPopup();
}

function showAlexAIFeedbackPopup() {
    $('#feedback_form_success').addClass('hidden');
    $('#feedback_form_container').removeClass('hidden');
    $('#alexai-exit-popup').modal('show');
}

function removeTrainingMessage() {
    const alexSection = document.querySelector('#trainingMessage');
    if (alexSection) {
        alexSection.remove();
    }
}

function showSpinner() {
    console.log('Show Spinner');
    $('.ai-vr-banner').addClass('alexai-starting');

}

function hideSpinner() {
    console.log('Hide Spinner');
    $('.ai-vr-banner').removeClass('alexai-starting');
}

function getLinksFromAnswer(answer) {
    answer = answer.toLowerCase();

    //Regex to remove SSML tags
    let regex = /(<([^>]+)>)/ig;
    let response = answer.replace(regex, "");

    //Regex to extract all URLS in the conversation
    regex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â€œâ€â€˜â€™]))/gi

    return response.match(regex)
}

function getLinksByKeywords(answer) {
    answer = answer.toLowerCase();
    const usedURLs = [];
    const filteredKeywords = [];

    for (const keyWord of AlexAI.mapOfKeyWords.entries()) {
        if (answer.indexOf(keyWord[0]) >= 0) {
            console.log("--- found keyword: " + keyWord[0]);
            let url = keyWord[1][0];
            if (keyWord[1][0].indexOf('?') > -1) {
                url = keyWord[1][0].substring(0, keyWord[1][0].indexOf('?'));
            }
            if (usedURLs.includes(url)) {
                console.log('--- duplicate URL: ' + url);
            } else {
                console.log('--- new URL: ' + url);
                usedURLs.push(url);
                keyWord[1].push(keyWord[0]);
                filteredKeywords.push(keyWord[1]);
            }
        }

    }

    return filteredKeywords;
}