window.addEventListener("load", function() {

    const container = document.getElementById("container");

    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) {

        response.json().then(function(json) {

            let sortedJson = sortJson(json);
            
            displayCount(sortedJson);

            displayAstronauts(sortedJson);

        });
    });
});


function sortJson(json) {

    let sortedJson = json.sort(function(a, b) { return b.hoursInSpace - a.hoursInSpace});
    return sortedJson;
};


function displayCount(sortedJson) {

    let count = sortedJson.length;
            container.innerHTML = `
                <div class="astronautCount">
                    <h4>Total number of Astronauts: ${count}</h4>
                </div>
            `;
};


function displayAstronauts(sortedJson) {

    for (let i = 0; i < sortedJson.length; i++) {
        container.innerHTML += `
            <div class="astronaut">
                <div class="bio">
                    <h3>${sortedJson[i].firstName} ${sortedJson[i].lastName}</h3>
                    <ul>
                        <li>Hours in space: ${sortedJson[i].hoursInSpace}</li>
                        ${printActive(sortedJson[i])}
                        <li>Skills: ${sortedJson[i].skills.join(", ")}</li>
                    </ul>
                </div>
            <img class="avatar" src="${sortedJson[i].picture}">
            </div>
        `
    }
};


function printActive(json) {

    if (json.active === true) {
        return `<li class="activeColor">Active: true</li>`;
    }
    return `<li>Active: false</li>`;
};