async function load(params, callback){
    const response = await ajax.sendRequest("GET", "/api", params).catch(ajax.errore);
    const results = response?.data?.results;

    callback(results.at(0));
    return results;
}