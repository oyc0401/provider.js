import {ViewModel} from "./view_model.js"
import {Provider} from "../service/provider.js";

let provider = new Provider(new ViewModel());

provider.watch(function (model) {
    let count = document.getElementById("count");
    count.innerText = `${model.count}`;

})

provider.read(function (model) {
    let button = document.getElementById("button");
    button.addEventListener("click", function () {
        model.plus();
    });

})


