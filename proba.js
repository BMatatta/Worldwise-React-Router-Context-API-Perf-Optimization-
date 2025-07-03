function deriveFinalPrice(inputPrice) {
    var finalPrice = inputPrice + inputPrice * 0.19;
    var outputEl = document.getElementById("final-price");
    outputEl.textContent = "Final Price: " + finalPrice + " €";
}
var formEl = document.querySelector("form");
formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var fd = new FormData(event.currentTarget);
    var inputPrice = fd.get("price");
    deriveFinalPrice(+inputPrice);
});
