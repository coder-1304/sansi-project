document.addEventListener("DOMContentLoaded", function () {
  const analyzeButton = document.getElementById("analyze-button");
  const resultText = document.getElementById("result-text");
  const textInput = document.getElementById("text-input");

  analyzeButton.addEventListener("click", function () {
    const text = textInput.value;
    if(text.length===0){
      alert("Please add some text");
      return;
    }
    document.getElementById("emotions-meter").style.display = "none"
    const data = {
      text: text,
    };
    console.log(data);
    var memeImage = document.getElementById("meme-image");
    let color = "";
    let result = "";
    let bgCol = "";

    // Send a POST request to the server
    fetch("http://127.0.0.1:8080/prediction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        switch (res.predicted_emotion) {
          case "neutral":
            color = "gray";
            result = "Neutral 😐";
            break;
          case "joy":
            color = "green";
            result = "Joy 😄";
            bgCol = "rgb(232, 255, 232)";
            break;
          case "sadness":
            result = "Sadness 😢";
            color = "rgb(28, 60, 149)";
            bgCol = "rgb(222, 231, 255)";
            break;
          case "fear":
            result = "Fear 😨";
            color = "rgb(33, 33, 33)";
            bgCol = "rgb(33, 33, 33)";
            break;
          case "surprise":
            result = "Surprise 😲";
            color = "rgb(205, 205, 0)";
            bgCol = "rgb(225, 225, 165)";
            break;
          case "anger":
            result = "Anger 😡";
            color = "darkred";
            bgCol = "rgb(244, 194, 194)"
            break;
          case "shame":
            result = "Shame 😳";
            color = "rgb(255, 121, 143)";
            bgCol = "rgb(255, 234, 234)";
            break;
          case "disgust":
            result = "Disgust 🤢";
            bgCol = "rgb(187, 249, 255)"
            color = "rgb(0, 223, 186)";
            break;
          default:
            resultText.style.color = "black"; // Default color for other sentiments
        }
        memeImage.src = `./images/${res.predicted_emotion}.jpg`;
        resultText.textContent = result;
        resultText.style.color = color;
        document.body.style.backgroundColor = bgCol;
      })
      .catch((error) => {
        console.error("Error:", error);
        resultText.textContent = "Error occurred.";
      });
  });
});
