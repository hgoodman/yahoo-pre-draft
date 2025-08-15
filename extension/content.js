
$.get(chrome.runtime.getURL("clipboard.html"), function (html) {
  $("#editprerank").prepend(html);

  $("#pdr_header").css(
    "background-image",
    "url('" + chrome.runtime.getURL("img/icon16.png") + "')"
  );

  //
  // Display instructions in the text area.
  //
  const pasteBinInitialMsg =
    "Paste your player names here and click \"Next >>\".\n" +
    "Only full names are used. No numbers, positions or team names.";
  $("#pdr_paste_bin").val(pasteBinInitialMsg).focus(function () {
    if ($(this).val() === pasteBinInitialMsg) {
      $(this).val("").toggleClass("pdr_paste_bin_unfocused");
      $("#pdr_load_player_list").removeClass("Btn-disabled").prop("disabled", false);
    }
  });

  //
  // Set up the button to parse player names from the text area and arrange them
  // in a column view.
  //
  $("#pdr_load_player_list").on("click", function () {
    $(this).prop("disabled", true).html("Working on it...");

    const players = $("#pdr_paste_bin").val().split("\n");
    const filteredPlayers = [];
    for (let i = 0; i < players.length; i++) {
      let p = players[i].trim();
      if (p === "") continue;
      let matches = /(.*), (.*)/.exec(p);
      if (matches) {
        p = matches[2] + " " + matches[1];
      }
      matches = /(.*) +- .*/.exec(p);
      if (matches) {
        p = matches[1];
      }
      filteredPlayers.push(p);
    }

    const maxPlayersPerCol = Math.ceil(filteredPlayers.length / 5);
    const colHTML = [[], [], [], [], []];
    for (let i = 0; i < filteredPlayers.length; i++) {
      const col = Math.floor(i / maxPlayersPerCol);
      colHTML[col].push(
        "<div class=\"pdr_player\">",
        "<span>" + (i + 1) + ". </span>",
        "<span>" + filteredPlayers[i] + "</span>",
        "</div>"
      );
    }

    for (let i = 0; i < colHTML.length; i++) {
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
  $("#pdr_expand_player_list").on("click", function () {
    $(this).addClass("Btn-disabled").prop("disabled", true).html("Working on it...");
    const expandButton = this;
    const loadMoreInterval = setInterval(function () {
      const loadMoreButton = $("#load_more");
      if (loadMoreButton[0]) {
        const count = parseInt(/count=([0-9]+)/.exec(loadMoreButton[0].href)[1], 10);
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
    const playerList = $("#all_player_list > li");
    let playerId = null;
    playerList.each(function () {
      const playerIdDiv = $(this).find("span").eq(0).find("div").eq(0);
      const n = playerIdDiv.find(".Bfc").find("span").eq(1).text();
      if (PDRPlayers.namesMatch(playerName, n)) {
        playerId = playerIdDiv.attr("data-playerid");
        $(this).remove(); // Ensures the same player won't be selected twice
        return false;
      }
    });
    return playerId;
  }

  function fetchAllPlayerIds() {
    const playerList = $("#all_player_list > li");
    const playerIds = [];
    playerList.each(function () {
      const playerIdDiv = $(this).find("span").eq(0).find("div").eq(0);
      const id = playerIdDiv.attr("data-playerid");
      if (id) playerIds.push(id);
    });
    return playerIds.join();
  }

  //
  // Set up the button to populate hidden form fields with selected player IDs.
  //
  $("#pdr_add_preferred_players").on("click", function () {
    $("#pdr_expand_player_list").hide();
    $(this).addClass("Btn-disabled").prop("disabled", true).html("Working on it...");

    const playerDivs = [];
    $("#pdr_player_lists").find(".pdr_player_col").each(function () {
      $(this).find(".pdr_player").each(function () {
        playerDivs.push(this);
      });
    });

    const myPlayerIds = [];
    const addPlayerInterval = setInterval(function () {
      if (playerDivs.length > 0) {
        const div = playerDivs.shift();
        const playerName = $(div).find("span").eq(1).text();
        const playerId = fetchPlayerId(playerName);
        if (playerId) {
          $(div).append(" - <span class=\"pdr_player_found\">Queued</span>");
          myPlayerIds.push(playerId);
        } else {
          $(div).append(" - <span class=\"pdr_player_not_found\">Not Found</span>");
        }
      } else {
        clearInterval(addPlayerInterval);
        const editPreRankForm = $("#editprerank-form");
        editPreRankForm.find("input[name=all_players]").val(fetchAllPlayerIds());
        editPreRankForm.find("input[name=my_players]").val(myPlayerIds.join());
        $("#pdr_add_preferred_players").hide();

        // Clicking around in the pre-draft interface will mess with the values
        // in the hidden form fields, so hide the interface controls.
        const playDivs = $("#play > div");
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

/* eslint max-len: ["error", 100], quotes: ['error', 'double'] */
