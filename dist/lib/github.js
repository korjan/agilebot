var GitHubApi = require("github");
var github = new GitHubApi({
    // optional args
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    },
    timeout: 5000
});
// TODO: optional authentication here depending on desired endpoints. See below in README.
var commits = function () {
    // console.log(github.users)
    github.activity.getEventsForUser({
        // optional:
        // headers: {
        //     "cookie": "blahblah"
        // },
        owner: "korjan"
    }, function (err, res) {
        res.forEach(function (item) { return console.log(item.type, item.repo.name); });
    });
};
module.exports = {
    commits: commits
};
