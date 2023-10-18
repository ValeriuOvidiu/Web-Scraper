async function sendToApi() {
  let output = document.getElementById('output')
  await axios.post('http://localhost:3000/api-scrape', {
    url: document.getElementById('search').value
  })
    .then(function (response) {
      console.log(response);
      output.innerText = "[" + '\n'
      let responseLen = response.data.length
      console.log(responseLen)

      for (let i = 0; i < responseLen; ++i) {
        output.innerText += "     { \n"
        output.innerText += '          ' + "\"title\": " + "\"" + response.data[i].title + "\"," + '\n'
        output.innerText += '          ' + "\"short_description\": " + "\"" + response.data[i].short_description + "\"," + '\n'
        output.innerText += '          ' + "\"img\": " + "\"" + response.data[i].img + "\"," + '\n'
        output.innerText += '          ' + "\"href\": " + "\"" + response.data[i].href + "\"," + '\n'
        output.innerText += '          ' + "\"sentiment\": " + "\"" + response.data[i].sentiment + "\"," + '\n'
        output.innerText += '          ' + "\"words\": " + "\"" + response.data[i].words + "\"," + '\n'
        output.innerText += "     }, \n"
      }
      output.innerText += "]" + '\n'
    })
    .catch(function (error) {
      output.innerText = "[" + '\n'
      output.innerText += "     { \n"
      output.innerText += '          ' + "\"error\": " + "\"Something went wrong!\"," + '\n'
      output.innerText += "     }, \n"
      output.innerText += "]" + '\n'
    });
}
function processKey(event) {
  if (event.which === 13) {
    sendToApi()
  }
}
window.onload = (() => {
  document.getElementById('search').addEventListener("keydown", processKey)
})