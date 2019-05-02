export const commissioningService = {
    setWifiInfo,
    upload,
    selectSensor,
    uploadKey,
    getSensors,
    setWindAddress,
    getWindAddress
};

const hostName = window.location.hostname+ ':5000';

function setWifiInfo(ssid, pass) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "ssid": ssid,
            "password": pass
        })
    };

    return fetch(`http://${hostName}/setWifiInfo`, requestOptions)
        .then(handleResponse)
}

function upload(file) {
    var data = new FormData()
    console.log(file);
    data.append('file', file)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: data
    };

    return fetch(`http://${hostName}/loadStaticData`, requestOptions)
        .then(handleResponse)
}

function uploadKey(file) {
    var data = new FormData()
    console.log(file);
    data.append('file', file)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: data
    };

    return fetch(`http://${hostName}/loadBigQueryKey`, requestOptions)
        .then(handleResponse)
}

function selectSensor(windSensor, rainSensor, floodSensor, snowSensor) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "windSensor": windSensor,
            "rainSensor": rainSensor,
            "floodSensor": floodSensor,
            "snowSensor": snowSensor,
        })
    };

    console.log(requestOptions);

    return fetch(`http://${hostName}/set/sensors`, requestOptions)
        .then(handleResponse)
}

function setWindAddress(address) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "deviceAddress": address,
        })
    };

    console.log(requestOptions);

    return fetch(`http://${hostName}/set/windSensorSettings`, requestOptions)
        .then(handleResponse)
}


function getWindAddress() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostName}/get/windSensorSettings`, requestOptions)
        .then(handleResponse)
}

function getSensors() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostName}/get/sensors`, requestOptions)
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
