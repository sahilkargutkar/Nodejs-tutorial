//Callback and How to Use Callback function

console.log("before");
// getUser(1, (user) => {
//   gitRespositories(user.gitHubUsername, (repo) => {
//     gitCommit(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

getUser(1)
  .then((user) => gitRespositories(user.gitHubUsername))
  .then((repo) => gitCommit(repo))
  .then((commits) => console.log("Commits", commits))
  .catch((err) => console.log("Error", err.message));

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from database");
      resolve({ id: id, gitHubUsername: "sahil" });
    }, 2000);
  });
}

function gitRespositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching repos from github ");
      resolve(["repo1", "repo2", "repo3"]);
    }, 3000);
  });
}

function gitCommit(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github Api");
      resolve(["commit"]);
    }, 2000);
  });
}
