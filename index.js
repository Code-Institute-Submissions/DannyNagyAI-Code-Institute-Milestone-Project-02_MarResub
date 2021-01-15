function getUpcomingGames() {
    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.football-data.org/v2/teams/86/matches?status=SCHEDULED', true)
    request.setRequestHeader('X-Auth-Token', 'fb98c7e9a10644a3a9faf1f9fb96acf3')

    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      var rownr = 1;
 
      if (request.status >= 200 && request.status < 400) {
 
        data.matches.forEach((match) => {
          console.log(match)

          var startDate = JSON.parse(JSON.stringify(match["season"]["startDate"]))
          var homeTeam  = JSON.parse(JSON.stringify(match["homeTeam"]["name"]))
          var awayTeam  = JSON.parse(JSON.stringify(match["awayTeam"]["name"]))

          var table = document.getElementById("matchtable");

          // Create an empty <tr> element and add it to the 1st position of the table:
          var row = table.insertRow(-1);

          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);

          // Add some text to the new cells:
          cell1.innerHTML = rownr;
          cell2.innerHTML = startDate;
          cell3.innerHTML = homeTeam;
          cell4.innerHTML = awayTeam;

          rownr ++;

        });
      } else {
        console.log('error')
      }
    }
    request.send()
  }



