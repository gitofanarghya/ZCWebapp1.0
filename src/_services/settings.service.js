export const settingsService = {
    setPanID,
    threshold,
    heartBeat,
    timeZone,
    getHeartBeat,
    getThreshold,
    getPanID,
    getFrequency,
    setFrequency,
};

const hostName = window.location.hostname+ ':5000';

const hostNameXBee = window.location.hostname+':5001';
//const hostNameXBee = 'https://ancient-catfish-90.localtunnel.me';

function setPanID(panID) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "panID": panID
        })
    };

    console.log(panID);

    return fetch(`http://${hostNameXBee}/settings/xbeePanID `, requestOptions)
        .then(handleResponse)
}

function threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer, maxFloodLevel, maxSnowFall) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "maxWindSpeed": maxWindSpeed,
            "maxRainFall": maxRainFall,
            "meanWindSpeed": meanWindSpeed,
            "windSpeedTimer": windSpeedTimer,
            "maxFloodLevel": maxFloodLevel,
            "maxSnowFall": maxSnowFall,
        })
    };

    return fetch(`http://${hostName}/set/threshold`, requestOptions)
        .then(handleResponse)
}

function setFrequency(power, status) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "powerRequestTimePeriod": power,
            "statusRequestTimePeriod": status,
        })
    };

    return fetch(`http://${hostName}/set/requestFrequency`, requestOptions)
        .then(handleResponse)
}



function heartBeat(enabled, hbinterval, maxMsgs) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "enabled": enabled,
            "interval": hbinterval,
            "maxMsgs": maxMsgs,
        })
    };

    return fetch(`http://${hostName}/set/heartBeatSettings`, requestOptions)
        .then(handleResponse)
}

function timeZone(time) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "timeZone": time,
        })
    };

    return fetch(`http://${hostName}/setTimeZone`, requestOptions)
        .then(handleResponse)
}

function getThreshold() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostName}/get/threshold`, requestOptions)
        .then(handleResponse)
}

function getFrequency() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostName}/get/requestFrequency`, requestOptions)
        .then(handleResponse)
}

function getHeartBeat() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostName}/get/heartBeatSettings`, requestOptions)
        .then(handleResponse)
}

function getPanID() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostNameXBee}/gettings/xbeePanID`, requestOptions)
        .then(handleResponse)
}


function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            if (response.status === 403) {
                console.log("403")
                localStorage.removeItem('user')
                window.location.reload(true);
            }

            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        }
        return json;
    });
}
