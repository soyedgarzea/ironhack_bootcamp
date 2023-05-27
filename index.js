const { Octokit } = require("octokit");

const reposName = [
  'LAB-Module-Exercise-Mars-Rover-Kata',
  'LAB-Module-Exercise-NPM-Clone',
  'lab-advance-querying-mongo',
  'lab-bootstrap-cloning-revera',
  'lab-canvas-hangman',
  'lab-canvas-race-car',
  'lab-css-flexbox-slack',
  'lab-css-instagram-clone',
  'lab-css-recipes-clone',
  'lab-css-spotify-clone',
  'lab-dom-ironhack-cart',
  'lab-dom-pizza-builder',
  'lab-es6-javascript-koans',
  'lab-express-basic-site',
  'lab-express-spotify',
  'lab-github-practice',
  'lab-hello-ironhack',
  'lab-intro-node',
  'lab-ironbeers',
  'lab-javascript-advanced-algorithms',
  'lab-javascript-chronometer',
  'lab-javascript-clue',
  'lab-javascript-functions-and-arrays',
  'lab-javascript-greatest-movies',
  'lab-javascript-memory-game',
  'lab-javascript-vikings',
  'lab-mongoose-movies',
  'lab-mongoose-recipes',
  'lab-react-ironbeers',
  'lab-react-ironcontacts',
  'lab-react-ironnutrition',
  'lab-react-training',
  'lab-wiki-countries',
];

const octokit = new Octokit({
      auth: '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',
    });

(async() => {
  for await (const repo of reposName) {
    try {
      await octokit.request(`DELETE /repos/eamzea/${repo}`, {
    owner: 'eamzea',
    repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
      })
      console.log('repo deleted')
    } catch (error) {
      console.log('repo not found')
      continue
    }
}
})()
