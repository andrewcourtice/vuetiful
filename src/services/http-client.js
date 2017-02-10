class HttpRequest {

    constructor(url, method) {
        this.url = url;
        this.method = method;
        this.type = "text/json";
        this.headers = [];
    }

    execute() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            
            request.onload = (event) => {

                resolve();
            };
        });
    }

}

export class HttpClient {
    constructor() {

    }
}