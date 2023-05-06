import {ChangeNotifier} from "../service/provider.js"

export class ViewModel extends ChangeNotifier {
    #count = 0;

    get count() {
        return this.#count;
    }

    plus() {
        this.#count++;
        this.notifyListeners();
    }

}


