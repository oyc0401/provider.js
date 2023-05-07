import {ViewModel} from "./view_model.js"
import {Provider} from "../service/provider.js";

Provider.instance({
    model: new ViewModel()
})
    .watch(function (model) {
        let count = document.getElementById("count");
        count.innerText = `${model.count}`;

    })
    .read(function (model) {
        let button = document.getElementById("button");
        button.addEventListener("click", function () {
            model.plus();
        });

    })
    .close();

