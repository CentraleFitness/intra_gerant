import axios from 'axios';

class Communication {
    constructor(method, path, params) {
        this.method = method;
        this.path = path;
        this.params = params;
    }

    sendRequest(thenFunc, catchFunc) {
        let method = this.method;
        let path = this.path;
        let params = this.params;

        axios({
            method: method,
            url: path,
            data: JSON.stringify(params)
        })
        .then(thenFunc)
        .catch(catchFunc);
    }
}

export default Communication;