var TEAM_ORDER_EAST = ['atl','bkn','bos','cha','chi','cle','det','gsw','hou','ind','lac','lal','mem','mia','mil'];
var TEAM_ORDER_WEST = ['min','nop','nyk','okc','orl','phi','phx','por','sac','sas','tor','uta','was','dal','den'];

// TEAM_LIST - 从 TEAMS_DATA 生成
var TEAM_LIST = [];
(function() {
  for (var id in TEAMS_DATA) {
    TEAM_LIST.push(TEAMS_DATA[id]);
  }
})();

function getTeamConference(teamId) {
  var team = TEAMS_DATA[teamId];
  return team ? team.conference : null;
}

function getTeamsByConference(conf) {
  var teams = [];
  for (var id in TEAMS_DATA) {
    if (TEAMS_DATA[id].conference === conf) {
      teams.push(TEAMS_DATA[id]);
    }
  }
  return teams;
}

function getTeamTotalSalary(team) {
  return team.players.reduce(function(s, p) { return s + p.salary; }, 0);
}

function renderTeamList() {
  var container = document.getElementById('teams-tab-content');
  if (!container) return;

  var eastTeams = getTeamsByConference('east');
  var westTeams = getTeamsByConference('west');

  eastTeams.sort(function(a, b) { return a.name.localeCompare(b.name, 'zh'); });
  westTeams.sort(function(a, b) { return a.name.localeCompare(b.name, 'zh'); });

  var html = '';

  html += '<div class="teams-section">';
  html += '<h2 class="teams-section-title">东部联盟</h2>';
  html += '<div class="teams-grid">';
  eastTeams.forEach(function(team) {
    html += renderTeamListCard(team);
  });
  html += '</div></div>';

  html += '<div class="teams-section">';
  html += '<h2 class="teams-section-title">西部联盟</h2>';
  html += '<div class="teams-grid">';
  westTeams.forEach(function(team) {
    html += renderTeamListCard(team);
  });
  html += '</div></div>';

  container.innerHTML = html;

  container.querySelectorAll('.team-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var teamId = this.getAttribute('data-team-id');
      if (typeof showTeamDetail === 'function') {
        showTeamDetail(teamId);
      }
    });
  });
}

function renderTeamListCard(team) {
  var totalSalary = getTeamTotalSalary(team);
  var capLabel = team.capRoom >= 0 ? '帽空间' : '超税线';
  var capValue = team.capRoom >= 0 ? fmt(team.capRoom) : fmt(Math.abs(team.capRoom));
  var capClass = team.capRoom >= 0 ? 'success' : 'danger';

  return '<div class="team-card" data-team-id="' + team.id + '" style="border-color:' + team.color + ';">' +
    '<div class="team-card-head">' +
      '<div class="team-card-logo" style="background:' + team.color + ';">' + getShortName(team, 2) + '</div>' +
      '<div class="team-card-info">' +
        '<span class="team-card-name">' + team.shortName + '</span>' +
        '<span class="team-card-fullname">' + team.name + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="team-card-stats">' +
      '<div class="team-card-stat">' +
        '<span class="team-card-stat-label">总薪资</span>' +
        '<span class="team-card-stat-value">' + fmt(totalSalary) + '</span>' +
      '</div>' +
      '<div class="team-card-stat">' +
        '<span class="team-card-stat-label">' + capLabel + '</span>' +
        '<span class="team-card-stat-value ' + capClass + '">' + capValue + '</span>' +
      '</div>' +
      '<div class="team-card-stat">' +
        '<span class="team-card-stat-label">球员</span>' +
        '<span class="team-card-stat-value">' + team.players.length + '人</span>' +
      '</div>' +
    '</div>' +
  '</div>';
}
