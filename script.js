window.addEventListener("load", function() {

    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) {
        response.json().then(function(json) {

            let newJson = json.sort(function(a, b) { return b.hoursInSpace - a.hoursInSpace});
            const container = document.getElementById("container");

            let count = newJson.length;
            container.innerHTML = `
                <div class="astronautCount">
                    <h4>Total number of Astronauts: ${count}</h4>
                </div>
            `;

            for (let i = 0; i < newJson.length; i++) {
                container.innerHTML += `
                    <div class="astronaut">
                        <div class="bio">
                            <h3>${newJson[i].firstName} ${newJson[i].lastName}</h3>
                            <ul>
                                <li>Hours in space: ${newJson[i].hoursInSpace}</li>
                                ${printActive(newJson[i])}
                                <li>Skills: ${newJson[i].skills.join(", ")}</li>
                            </ul>
                        </div>
                    <img class="avatar" src="${newJson[i].picture}">
                    </div>
                `
            };

        });
    });
});

function printActive(json) {

    if (json.active === true) {
        return `<li class="textColor">Active: true</li>`;
    }
    return `<li>Active: false</li>`;
}