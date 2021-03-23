var REST_HOST = "https://app.sportdataapi.com";
var API_KEY = "apikey=39106620-56b6-11eb-90e9-71b6fcd4fd65";
var LEAUGES_URI = "/api/v1/soccer/leagues";
var SEASONS_URI = "/api/v1/soccer/seasons";
var MATCHES_URI = "/api/v1/soccer/matches";

var DATE_FROM = "2021-03-22";
var DATE_TO = "2021-03-28";

// GET Request.
fetch(REST_HOST+LEAUGES_URI+"?"+API_KEY)
    // Handle success
    .then(response => response.json())  // convert to json
    //.then(json => console.log(json))    //print data to console
    .then(json => initLeagues(json))    // send the json response to the ..
    .then(initTeams())
    .catch(err => console.log('Request Failed', err)); // Catch errors



// ------------------------------
// 18   = Premier League
// 314  = Bundesliga
// 392  = Serie A
// 538  = LaLiga
// ------------------------------
function initLeagues(json) {
    //debug(json);

    // 1. Get a handle to the selectbox for leagues
    const leagues = document.querySelector('#leagues');

    // Begin accessing JSON data here
    json.data.forEach((league) => {
        var id = JSON.parse(JSON.stringify(league["league_id"]));
        var name = JSON.parse(JSON.stringify(league["name"]));

        if(id == 18 || id == 314 || id == 392 || id == 538) {
            var opt = document.createElement('option');
            opt.value = id;
            opt.innerHTML = name;
            leagues.appendChild(opt);
        }
        leagues.selectedIndex=1;
    })
}

function initTeams() {
    var sl = document.getElementById("leagues").options[document.getElementById("leagues").selectedIndex].value;

    fetch(REST_HOST+SEASONS_URI+"?"+API_KEY+"&league_id="+sl)
        .then(response => response.json())  // convert to json
        .then(json => getMatches(json))    // send the json response to the 
        .catch(err => console.log('Request Failed', err)); // Catch errors
}

async function getMatches(json) {
    // 1. Iterate to get the currenct active season 
    var current_season_id = 0;

    json.data.forEach((season) => {
        var season_id = JSON.parse(JSON.stringify(season["season_id"]));
        var current_season = JSON.parse(JSON.stringify(season["is_current"])); 

        if(current_season == 1) {
            current_season_id = season_id;
        }
    })

    // 2. Get the matches for the current season of the chosen league
    var url = REST_HOST+MATCHES_URI+"?"+API_KEY+"&season_id="+current_season_id+"&date_from="+DATE_FROM+"&date_to="+DATE_TO;
    var matches = fetch(url)
        .then(async (response) => {
        const data = await response.json();
        console.log(data);
    })
}



function debug(text) {
    console.log("=======================================");
    console.log(text);
    console.log("=======================================");
}


/*
function getUpcomingGames() {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://app.sportdataapi.com/api/v1/soccer/matches?apikey=39106620-56b6-11eb-90e9-71b6fcd4fd65&season_id=1511&date_from=2021-01-15&status_code=0', true)
    //request.setRequestHeader('X-Auth-Token', 'fb98c7e9a10644a3a9faf1f9fb96acf3')

    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      var rownr = 1;
 
      if (request.status >= 200 && request.status < 400) {
        data.data.forEach((match) => {

          //console.log(match)
          //console.log(typeof(JSON.parse(JSON.stringify(match["home_team"]["team_id"]))))

          if(JSON.parse(JSON.stringify(match["home_team"]["team_id"])) == 6402 || JSON.parse(JSON.stringify(match["away_team"]["team_id"])) == 6402)
          {
            var startDate = JSON.parse(JSON.stringify(match["match_start"])).substring(0,10)
            var homeTeam  = JSON.parse(JSON.stringify(match["home_team"]["name"]))
            var awayTeam  = JSON.parse(JSON.stringify(match["away_team"]["name"]))
            var htm_logo  = JSON.parse(JSON.stringify(match["home_team"]["logo"]))
            var atm_logo  = JSON.parse(JSON.stringify(match["away_team"]["logo"]))
            var arena     = JSON.parse(JSON.stringify(match["venue"]["name"]))
            var city      = JSON.parse(JSON.stringify(match["venue"]["city"]))

            var table = document.getElementById("matchtable");

            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(-1);

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
          }

        });
      } else {
        console.log('error');
      }
    }
    request.send();

  }
*/
