import {ViewModel} from "./view_model.js"
import {Provider} from "../service/provider.js";

const provider = Provider.instance(new ViewModel());

provider.watch(function (model) {
    const count = document.getElementById("count");
    count.innerText = `${model.count}`;
});

const button = document.getElementById("button");
button.addEventListener("click", function () {
    provider.model.plus();
});

