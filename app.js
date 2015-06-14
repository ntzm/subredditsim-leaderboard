var subredditNames = [
    "2007scape",
    "4chan",
    "AdviceAnimals",
    "AskHistorians",
    "AskReddit",
    "AskScience",
    "anime",
    "asoiaf",
    "atheism",
    "aww",
    "badhistory",
    "Bitcoin",
    "books",
    "cars",
    "changemyview",
    "childfree",
    "Christianity",
    "circlejerk",
    "comicbooks",
    "conspiracy",
    "cringe",
    "CrusaderKings",
    "dota2",
    "drugs",
    "dwarffortress",
    "europe",
    "explainlikeimfive",
    "fitness",
    "food",
    "funny",
    "Futurology",
    "Games",
    "gaming",
    "gonewild",
    "hiphopheads",
    "IAmA",
    "KotakuInAction",
    "leagueoflegends",
    "LegalAdvice",
    "Libertarian",
    "malefashionadvice",
    "MensRights",
    "mildlyinteresting",
    "Minecraft",
    "movies",
    "Music",
    "mylittlepony",
    "news",
    "nosleep",
    "nfl",
    "parenting",
    "pcmasterrace",
    "personalfinance",
    "pics",
    "pokemon",
    "polandball",
    "politics",
    "programming",
    "science",
    "sex",
    "Showerthoughts",
    "soccer",
    "SquaredCircle",
    "SubredditDrama",
    "technology",
    "television",
    "TheRedPill",
    "tifu",
    "todayilearned",
    "trees",
    "TrollXChromosomes",
    "TumblrInAction",
    "TwoXChromosomes",
    "videos",
    "worldnews",
    "wow",
    "writingprompts"
];

var leaderboard = [];

function getSubreddits(index) {
    index = index ? index : 0;

    var subredditName = subredditNames[index];

    var request = $.ajax({
        url: 'https://www.reddit.com/user/' + subredditName + '_SS/about.json'
    });

    request.done(function(botData) {
        leaderboard.push({
            name: subredditName,
            karma: botData.data.comment_karma
        });

        var loadingPercentage = (index + 1) / subredditNames.length * 100;

        $('.progress-bar')
            .css('width', loadingPercentage + '%')
            .html(Math.floor(loadingPercentage) + '%');
    });

    if (index < subredditNames.length - 1) {
        setTimeout(getSubreddits, 2000, index + 1);
    } else {
        request.done(displaySubreddits);
    }
}

function displaySubreddits() {
    leaderboard.sort(function(a, b) {
        if (a.karma < b.karma) {
            return 1;
        } else if (a.karma > b.karma) {
            return -1;
        } else {
            return 0;
        }
    });

    $('.progress').remove();

    for (var i = 0; i < leaderboard.length; i++) {
        var subreddit = leaderboard[i];

        $('tbody').append(
            '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td><a href="https://www.reddit.com/user/' + subreddit.name +'_SS">' + subreddit.name + '</a></td>' +
                '<td>' + subreddit.karma + '</td>' +
            '</tr>'
        );
    }
}

getSubreddits();
