import { call } from "redux-saga/effects";

let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Connection: "keep-alive",
};

function _printRequest(method, request, usedHeaders, params, result) {
    let print = "\n";
    print += `Method: ${method}\n`;
    print += `Endpoint: ${request}\n`;
    print += `Headers: ${JSON.stringify(usedHeaders, null, 2)}\n`;
    print += `Body: ${JSON.stringify({ params }, null, 2)}\n`;
    print += `Response: ${JSON.stringify(result, null, 2)}\n`;
    console.log(print);
}

function* _processResponse(method, result) {
    try {
        const response = yield result.json();

        let _res = response;

        const error = response?.message || response?.error || response.data?.error;

        if (error) {
            _res = { error };

            //yield logReqError(error, method);
            // if (response?.error?.statusCode === 403) {
            //   yield put(loginActions.fetchUserLogout("expired"));
            // }
        }

        return _res;
    } catch (error) {
        console.log("CATCH API _processResponse", method, error);
        //yield logReqError(error, method);
    }
}

function _processesRequest(method, urlBase) {
    return function* (
        endpoint,
        params = null,
        optionalsHeaders = null,
        legacy = false
    ) {
        const request = `${urlBase}${endpoint}`;
        try {
            // yield call(legacy ? _getLegacyToken : _getToken);
            let usedHeaders = headers;
            usedHeaders = optionalsHeaders
                ? { ...usedHeaders, ...optionalsHeaders }
                : { ...usedHeaders };
            const response = yield call(fetch, request, {
                method,
                headers: usedHeaders,
                ...(params
                    ? { body: legacy ? params : JSON.stringify({ params }) }
                    : {}),
            });
            const result = yield _processResponse(method, response);
            if (false) {
                _printRequest(method, request, usedHeaders, params, result);
            }

            return result;
        } catch (error) {
            console.log("API _processesRequest", method, error);
        }
    };
}

const api = (urlBase) => ({
    get: _processesRequest("GET", urlBase),
    post: _processesRequest("POST", urlBase),
    put: _processesRequest("PUT", urlBase),
    delete: _processesRequest("DELETE", urlBase),
});

export default api;
