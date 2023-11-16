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
    const data = {
      text: text,
    };
    console.log(data);

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
        console.log(res.prediction);
        resultText.textContent = res.prediction;
      })
      .catch((error) => {
        console.error("Error:", error);
        resultText.textContent = "Error occurred.";
      });
  });
});
