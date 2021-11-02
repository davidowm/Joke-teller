const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const API_KEY = '9d243a7f7f414cd0a7b8a8f1eb70ba2b';

// Disable/Enable button
const toggleButton = function () {
  button.disabled = !button.disabled;
};
// Passing our joke to VoiceRss APi
const tellMe = function (joke) {
  VoiceRSS.speech({
    key: API_KEY,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

// Get Jokes from Joke API
const getJokes = async function () {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text to speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.error('whoops', error);
  }
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
