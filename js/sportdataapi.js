var REST_HOST = "https://app.sportdataapi.com";
var API_KEY = "apikey=39106620-56b6-11eb-90e9-71b6fcd4fd65";
var LEAUGES_URI = "/api/v1/soccer/leagues";
var SEASONS_URI = "/api/v1/soccer/seasons";
var MATCHES_URI = "/api/v1/soccer/matches";
var SCORERS_URI = "/api/v1/soccer/topscorers";
var PL_LEAGUID = 237;
var LL_LEAGUID = 538;
var todays_date = (new Date()).toISOString().split('T')[0];
var pl_seasonID, ll_seasonID, current_season_id, pl_end_date, ll_end_date, league_end_date;
const spinner = document.getElementById("spinner");

// 1. Init
getMatches(null);

function getMatches(src) {
    spinner.removeAttribute('hidden');
    Promise.all([
        fetch(REST_HOST+SEASONS_URI+"?"+API_KEY+"&league_id=237"),
        fetch(REST_HOST+SEASONS_URI+"?"+API_KEY+"&league_id=538")
    ]).then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then(function (data) {
        // 1. Get some ID:s for current seasons ... future proof concept, gets the active season ID
        pl_seasonID = getCurrentSeasonID(data[0]);
        ll_seasonID = getCurrentSeasonID(data[1]);
        pl_end_date = getSeasonEndDate(data[0]);
        ll_end_date = getSeasonEndDate(data[1]);

        // We might need to store some data .. 
        localStorage.setItem("pl_seasonID", pl_seasonID);
        localStorage.setItem("ll_seasonID", ll_seasonID);
        
        if(src === null) {
            // Set the default league to PL
            current_season_id = pl_seasonID;
            league_end_date = pl_end_date;
            document.getElementById("pl").checked = true;
        }
        else {
            // Else, take the value of the radiobutton of choosen league
            if(src.value == PL_LEAGUID) {
                current_season_id = pl_seasonID;
                league_end_date = pl_end_date;
            }
            else if(src.value == LL_LEAGUID) {
                current_season_id = ll_seasonID;
                league_end_date = ll_end_date;
            }
        }

        // 3. Get the matches for the current season of the chosen league
        var url = REST_HOST+MATCHES_URI+"?"+API_KEY+"&season_id="+current_season_id+"&date_from="+todays_date+"&date_to="+league_end_date;
        var matches = fetch(url)
            .then(async (response) => {
            const data = await response.json();
            renderMatches(data);
            spinner.setAttribute('hidden', '');
        })

    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });
}

// Helper function, returns current, active seasonID
function getCurrentSeasonID(json) {
	// 1. Iterate to get the currenct active season 
    var current_season_id = 0;

    json.data.forEach((season) => {
        var season_id = JSON.parse(JSON.stringify(season["season_id"]));
        var current_season = JSON.parse(JSON.stringify(season["is_current"])); 

        if(current_season == 1) {
            current_season_id = season_id;
        }
    })
    return current_season_id;
}

// Helper function, returns current, active season end date
function getSeasonEndDate(json) {
	// 1. Iterate to get the currenct active season 
    var league_end_date = "";

    json.data.forEach((season) => {
        var end_date = JSON.parse(JSON.stringify(season["end_date"]));
        var current_season = JSON.parse(JSON.stringify(season["is_current"])); 

        if(current_season == 1) {
            league_end_date = end_date;
        }
    })
    return league_end_date;
}

/* Finally - we get to render some data - phew .. */
function renderMatches(data) {
    var tablebody = document.getElementById("tablebody");
    tablebody.innerHTML = "";

    // iterate the games from the current season of the chosen league ..
    data.data.forEach((match) => {
        var match_id  = JSON.parse(JSON.stringify(match["match_id"]));
        var startDate = JSON.parse(JSON.stringify(match["match_start"])).substring(0,10);
        var homeTeam  = JSON.parse(JSON.stringify(match["home_team"]["name"]));
        var awayTeam  = JSON.parse(JSON.stringify(match["away_team"]["name"]));
        var htm_logo  = JSON.parse(JSON.stringify(match["home_team"]["logo"]));
        var atm_logo  = JSON.parse(JSON.stringify(match["away_team"]["logo"]));
        var arena     = JSON.parse(JSON.stringify(match["venue"])) === null ? "N/A" : JSON.parse(JSON.stringify(match["venue"]["name"]));
        // Not showing city yet, might be used in version 2.0 ... save for now
        //var city      = JSON.parse(JSON.stringify(match["venue"])) === null ? "N/A" : JSON.parse(JSON.stringify(match["venue"]["city"]));

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = tablebody.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        // Add some text to the new cells:
        cell1.innerHTML = startDate;
        cell2.innerHTML = '<img src="'+htm_logo+'">'+homeTeam;
        cell3.innerHTML = '<img src="'+atm_logo+'">'+awayTeam;
        cell4.innerHTML = arena;
    });
}


function getTopScorersPL() {
    let req = new XMLHttpRequest();
    req.open('GET', REST_HOST + SCORERS_URI + "?" + API_KEY + "&season_id=" + localStorage.getItem("pl_seasonID"));
    req.onload = function() {
        if (req.status == 200) {
            renderTopScorers(req.responseText, "pltopscorer");
        }
        else {
            console.log("Error: " + req.status);
        }
    }
  req.send();
}
getTopScorersPL();

function getTopScorersLL() {
    let req = new XMLHttpRequest();
    req.open('GET', REST_HOST + SCORERS_URI + "?" + API_KEY + "&season_id=" + localStorage.getItem("ll_seasonID"));
    req.onload = function() {
        if (req.status == 200) {
            renderTopScorers(req.responseText, "lltopscorer");
        }
        else {
            console.log("Error: " + req.status);
        }
    }
  req.send();
}
getTopScorersLL();

function renderTopScorers(json, elementID) {
    pltopscorer = document.getElementById(elementID);
    var json_data = JSON.parse(json);

    json_data.data.forEach((player) => {
        var pos = JSON.parse(JSON.stringify(player["pos"]));
        var player_name = JSON.parse(JSON.stringify(player["player"]["player_name"]));

        if(pos >= 1 && pos <= 5)
        {
            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(player_name));
            pltopscorer.appendChild(entry);
        }

    })
}   

// ----------------------------------------------------------------------------------------
// UTILITY FUNCTION - WILL BE USED IN VERSION 2.0 - COMING SUMMER 2021
// ----------------------------------------------------------------------------------------
function filterLeagues(json) {

    var la = new Array(4);

    json.data.forEach((league) => {
        var id = JSON.parse(JSON.stringify(league["league_id"]));

        if(id == PL_LEAGUID || id == LL_LEAGUID) {
            la.push(league);
        }
    })

    return JSON.parse(JSON.stringify(la));

}
