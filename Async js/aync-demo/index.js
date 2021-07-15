//Callback and How to Use Callback function

console.log("before");
getUser(1, (user) => {
  console.log("User", user.id);

  gitRespositories(user.gitHubUsername, (repo) => {
    console.log("Repos", repo);
    console.log("User", user.gitHubUsername);
  });
});
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from database");
    callback({ id: id, gitHubUsername: "sahil" });
  }, 2000);
}

function gitRespositories(username, callback) {
  setTimeout(() => {
    console.log("Fetching repos from github ");
    callback(["repo1", "repo2", "repo3"]);
  }, 3000);
}
