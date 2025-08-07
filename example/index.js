import {ViewModel} from "./view_model.js"
import {Provider} from "../service/provider.js";

let provider = Provider.instance(new ViewModel());

provider.watch(function (model) {
    let count = document.getElementById("count");
    count.innerText = `${model.count}`;
});

let button = document.getElementById("button");
button.addEventListener("click", function () {
    provider.model.plus();
});

