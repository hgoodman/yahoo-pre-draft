
$.get(chrome.extension.getURL("clipboard.html"), function (html) {
  $("#editprerank").prepend(html);

  $("#pdr_header").css(
    "background-image",
    "url('" + chrome.extension.getURL("img/icon16.png") + "')"
  );

  //
  // Display instructions in the text area.
  //
  var pasteBinInitialMsg =
    "Paste your player names here and click \"Next >>\".\n" +
    "Only full names are used. No numbers, positions or team names.";
  $("#pdr_paste_bin").val(pasteBinInitialMsg).focus(function () {
    if ($(this).val() == pasteBinInitialMsg) {
      $(this).val("").toggleClass("pdr_paste_bin_unfocused");
      $("#pdr_load_player_list").removeClass("Btn-disabled").prop("disabled", false);
    }
  });

  //
  // Set up the button to parse player names from the text area and arrange them
  // in a column view.
  //
  $("#pdr_load_player_list").click(function () {
    $(this).prop("disabled", true).html("Working on it...");

    var players = $("#pdr_paste_bin").val().split("\n");
    var filteredPlayers = [];
    for (var i = 0; i < players.length; i++) {
      var p = players[i].trim();
      if (p == "") continue;
      var matches = /(.*), (.*)/.exec(p);
      if (matches) {
        p = matches[2] + " " + matches[1];
      }
      matches = /(.*) +- .*/.exec(p);
      if (matches) {
        p = matches[1];
      }
      filteredPlayers.push(p);
    }

    var maxPlayersPerCol = Math.ceil(filteredPlayers.length / 5);
    var colHTML = [[], [], [], [], []];
    for (var i = 0; i < filteredPlayers.length; i++) {
      var col = Math.floor(i / maxPlayersPerCol);
      colHTML[col].push(
        "<div class=\"pdr_player\">",
        "<span>" + (i + 1) + ". </span>",
        "<span>" + filteredPlayers[i] + "</span>",
        "</div>"
      );
    }

    for (var i = 0; i < colHTML.length; i++) {
      $("#pdr_player_lists").find(".pdr_player_col").eq(i).append(
        colHTML[i].join("")
      );
    }

    $(this).hide();
    $("#pdr_paste_bin").hide();
    $("#pdr_player_lists").show();
    $("#pdr_add_preferred_players").show();
  });

  //
  // Set up the button that auto-expands the default player list.
  //
  $("#pdr_expand_player_list").click(function () {
    $(this).addClass("Btn-disabled").prop("disabled", true).html("Working on it...");
    var expandButton = this;
    var loadMoreInterval = setInterval(function () {
      var loadMoreButton = $("#load_more");
      if (loadMoreButton[0]) {
        var count = parseInt(/count=([0-9]+)/.exec(loadMoreButton[0].href)[1], 10);
        if (count >= 1250) { // This should be enough, right?
          clearInterval(loadMoreInterval);
          $(expandButton).hide();
        } else {
          loadMoreButton[0].click();
        }
      }
    }, 1000);
  });

  function fetchPlayerId(playerName) {
    var playerList = $("#all_player_list > li");
    var playerId = null;
    playerList.each(function (index) {
      var playerIdDiv = $(this).find("span").eq(0).find("div").eq(0);
      var n = playerIdDiv.find(".Bfc").find("span").eq(1).text();
      if (playerName.startsWith(n) || n.startsWith(playerName)) {
        playerId = playerIdDiv.attr("data-playerid");
        $(this).remove(); // Ensures the same player won't be selected twice
        return false;
      }
    });
    return playerId;
  }

  function fetchAllPlayerIds() {
    var playerList = $("#all_player_list > li");
    var playerIds = [];
    playerList.each(function (index) {
      var playerIdDiv = $(this).find("span").eq(0).find("div").eq(0);
      var id = playerIdDiv.attr("data-playerid")
      if (id) playerIds.push(id);
    });
    return playerIds.join();
  }

  function getAlternateSpelling(playerName) {
    switch (playerName) {
      // The football alternate spellings
      case "Ben Watson":      return "Benjamin Watson";
      case "William Fuller":  return "Will Fuller";
      case "Steve Johnson":   return "Stevie Johnson";
      case "Mycole Pruitt":   return "MyCole Pruitt";
      case "Philly Brown":    return "Corey Brown";
      
      // The hockey alternate spellings
      case "TJ Brodie":                  return "T.J. Brodie";
      case "Pierre-Alexandre Parenteau": return "Pierre-Alexandr Parenteau";

     // The baseball alternate spellings
     case "Edwin Encarnacion":          return "Edwin Encarnación";
     case "Gregory Polanco":    return "Grégory Polanco";
     case "Yoenis Cespedes":    return "Yoenis Céspedes";
     case "Carlos Gonzalez":    return "Carlos González";
     case "Jose Ramirez":    return "José Ramírez";
     case "Adrian Beltre":    return "Adrián Béltre";
     case "J.D. Martinez":    return "J.D. Martínez";
     case "Robinson Cano":    return "Robinson Canó";
     case "Anthony Rendon":    return "Anthony Rendón";
     case "Hanley Ramirez":    return "Hanley Ramírez";
     case "Jose Bautista":    return "José Bautista";
     case "Jose Abreu":    return "José Abreu";
     case "Eduardo Nunez":    return "Eduardo Núñez";
     case "Martin Prado":    return "Martín Prado";
     case "Jose Altuve":    return "José Altuve";
     case "Gary Sanchez":    return "Gary Sánchez";
     case "Shin-Soo Choo":    return "Shin-soo Choo";
     case "Cesar Hernandez":    return "César Hernández";
     case "Yasmany Tomas":    return "Yasmany Tomás";
     case "Jose Reyes":    return "José Reyes";
     case "Carlos Gomez":    return "Carlos Gómez";
     case "Carlos Beltran":    return "Carlos Beltrán"
     case "Adrian Gonzalez":    return "Adrián González";
     case "Angel Pagan":    return "Ángel Pagán";
     case "Jose Peraza":    return "José Peraza";
     case "Eugenio Suarez":    return "Eugenio Suárez";
     case "Victor Martinez":    return "Víctor Martínez";
     case "Nori Aoki":    return "Norichika Aoki";
     case "Gregory Bird":    return "Greg Bird";
     case "Yulieski Gurriel":    return "Yuli Gurriel";
     case "Javier Baez":    return "Javier Báez";
     
     case "Carlos Martinez":    return "Carlos Martínez";
     case "Edwin Diaz":    return "Edwin Díaz";
     case "Aaron Sanchez":    return "Aarón Sánchez";
     case "Julio Urías":    return "Julio Urías"; 
     case "Pedro Baez":     return "Pedro Báez";
     case "Jose Quintana":    return "José Quintana";
     case "Julio Teheran":    return "Julio Teherán";
     case "Joaquin Benoit":    return "Joaquín Benoit";
     case "Hector Rondon":    return "Héctor Rondón";
     case "Xavier Cedeno":    return "Xavier Cedeño";
     case "Francisco Rodriguez":    return "Francisco Rodríguez";
     case "Fernando Rodriguez":    return "Fernando Rodríguez";
     case "Alex Colome":    return "Álex Colomé";
     case "Hector Neris":    return "Héctor Neris"; 
     case "Felix Hernandez":    return "Félix Hernández"; 
     case "Joseph Biagini":    return "Joe Biagini"; 
     case "Alex Claudio":    return "Álex Cláudio";
     case "Vince Velasquez":    return "Vince Velásquez"; 
     case "Junior Guerra":     return "Júnior Guerra";
     case "Jaime Garcia":    return "Jaime García";
     case "Ivan Nova":    return "Iván Nova";
     case "Arodys Vizcaino":    return "Arodys Vizcaíno";
     case "Erasmo Ramirez":    return "Erasmo Ramírez";
     case "Jose De Leon":    return "José De León";
     case "Eduardo Rodriguez":    return "Eduardo Rodríguez";
     case "Bartolo Colon":    return "Bartolo Colón";
     case "Gio Gonzalez":    return "Gio González";
     case "Julio Urias":    return "Julio Urías";
     case "Christopher Devenski":    return "Chris Devenski";
     case "Rafael Martin":    return "Rafael Martín";
     case "Daniel Winkler":    return "Dan Winkler";
          
    }
    return null;
  }

  //
  // Set up the button to populate hidden form fields with selected player IDs.
  //
  $("#pdr_add_preferred_players").click(function () {
    $("#pdr_expand_player_list").hide();
    $(this).addClass("Btn-disabled").prop("disabled", true).html("Working on it...");

    var playerDivs = [];
    $("#pdr_player_lists").find(".pdr_player_col").each(function (i) {
      $(this).find(".pdr_player").each(function (j) {
        playerDivs.push(this);
      });
    });

    var myPlayerIds = [];
    var addPlayerInterval = setInterval(function () {
      if (playerDivs.length > 0) {
        var div = playerDivs.shift();
        var playerName = $(div).find("span").eq(1).text();
        var playerId = fetchPlayerId(playerName);
        if (!playerId && getAlternateSpelling(playerName)) {
          playerId = fetchPlayerId(getAlternateSpelling(playerName));
        }
        if (playerId) {
          $(div).append(" - <span class=\"pdr_player_found\">Queued</span>");
          myPlayerIds.push(playerId);
        } else {
          $(div).append(" - <span class=\"pdr_player_not_found\">Not Found</span>");
        }
      } else {
        clearInterval(addPlayerInterval);
        var editPreRankForm = $("#editprerank-form");
        editPreRankForm.find("input[name=all_players]").val(fetchAllPlayerIds());
        editPreRankForm.find("input[name=my_players]").val(myPlayerIds.join());
        $("#pdr_add_preferred_players").hide();

        // Clicking around in the pre-draft interface will mess with the values
        // in the hidden form fields, so hide the interface controls.
        var playDivs = $("#play > div");
        playDivs.eq(0).hide();
        playDivs.eq(2).hide();
        $("#all_player_list").find(".icon_plus").hide();
        $("#all_player_list").find(".icon_close").hide();
        $("#load_more").hide();
        $("#sort_player").hide();
        $("#pos_player").hide();

        // By default, the "Save Changes" button looks like it can't be clicked on.
        $("#submit-editprerank").removeClass("Btn-disabled").addClass("Btn-primary");
        $("#pdr_done_message").show();
      }
    }, 30);
  });
});
