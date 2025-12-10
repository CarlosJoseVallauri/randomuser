async function load(){

    const PARAMS = {
        results: 0, // Number of results
        gender: "", // Gender of request
        nat: ""     // Nationalities
    }

    const response = await ajax.sendRequest("GET", "/api", PARAMS).catch(ajax.errore);
    const results = response?.data?.results;

    results?.forEach(person => {
        // Load values somewhere
    });
}