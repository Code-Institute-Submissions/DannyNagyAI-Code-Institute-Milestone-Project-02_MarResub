function getUpcomingGames() {
    var request = new XMLHttpRequest()

    request.open('GET', 'https://app.sportdataapi.com/api/v1/soccer/matches?apikey=39106620-56b6-11eb-90e9-71b6fcd4fd65&season_id=1511&date_from=2021-01-15&status_id=0', true)
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
        console.log('error')
      }
    }
    request.send()
  }



