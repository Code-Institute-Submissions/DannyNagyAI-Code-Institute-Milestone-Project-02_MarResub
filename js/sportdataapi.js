var REST_HOST = "https://app.sportdataapi.com";
var API_KEY = "apikey=39106620-56b6-11eb-90e9-71b6fcd4fd65";
var LEAUGES_URI = "/api/v1/soccer/leagues";
var SEASONS_URI = "/api/v1/soccer/seasons";
var MATCHES_URI = "/api/v1/soccer/matches";
var PL_LEAGUID = 237;
var LL_LEAGUID = 538;

var DATE_FROM = "2021-04-01";
var DATE_TO = "2021-04-31";
var pl_seasonID, ll_seasonID, current_season_id;

// 1. Init
getMatches(null);

function getMatches(src) {
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
        if(src === null) {
            // Set the default league to PL
            current_season_id = pl_seasonID;
            document.getElementById("pl").checked = true;
        }
        else {
            // Else, take the value of the radiobutton of choosen league
            console.log(src.value);
            if(src.value == PL_LEAGUID) {
                current_season_id = pl_seasonID;
            }
            else if(src.value == LL_LEAGUID) {
                current_season_id = ll_seasonID;
            }
        }

        // 3. Get the matches for the current season of the chosen league
        var url = REST_HOST+MATCHES_URI+"?"+API_KEY+"&season_id="+current_season_id+"&date_from="+DATE_FROM+"&date_to="+DATE_TO;
        var matches = fetch(url)
            .then(async (response) => {
            const data = await response.json();
            console.log(data);
            renderMatches(data);
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

/* Finally - we get to render some data - phew .. */
function renderMatches(data) {
    console.log(data);
    var rownr = 1;
    var tablebody = document.getElementById("tablebody");
    tablebody.innerHTML = "";

    // iterate the games from the current season of the chosen league ..
    data.data.forEach((match) => {
        var startDate = JSON.parse(JSON.stringify(match["match_start"])).substring(0,10)
        var homeTeam  = JSON.parse(JSON.stringify(match["home_team"]["name"]))
        var awayTeam  = JSON.parse(JSON.stringify(match["away_team"]["name"]))
        var htm_logo  = JSON.parse(JSON.stringify(match["home_team"]["logo"]))
        var atm_logo  = JSON.parse(JSON.stringify(match["away_team"]["logo"]))
        var arena     = JSON.parse(JSON.stringify(match["venue"])) === null ? "N/A" : JSON.parse(JSON.stringify(match["venue"]["name"]));
        var city      = JSON.parse(JSON.stringify(match["venue"])) === null ? "N/A" : JSON.parse(JSON.stringify(match["venue"]["city"]));

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = tablebody.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        // Add some text to the new cells:
        cell1.innerHTML = rownr;
        cell2.innerHTML = startDate;
        cell3.innerHTML = '<img src="'+htm_logo+'">'+homeTeam;
        cell4.innerHTML = '<img src="'+atm_logo+'">'+awayTeam;
        cell5.innerHTML = arena;
        cell6.innerHTML = city;

        rownr ++;
    });
}





// ----------------------------------------------------------------------------------------
// DELETE BELOW WHEN READY ... JUST SOME VALUEABLES .. 
// ----------------------------------------------------------------------------------------



// ------------------------------
// 237  = Premier League
// 538  = LaLiga
// ------------------------------
function filterLeagues(json) {

    var la = new Array(4);

    json.data.forEach((league) => {
        var id = JSON.parse(JSON.stringify(league["league_id"]));

        if(id == 18 || id == 314 || id == 392 || id == 538) {
            la.push(league);
        }
    })

    return JSON.parse(JSON.stringify(la));

}