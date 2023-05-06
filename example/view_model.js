import {ChangeNotifier} from "../service/provider.js"

export class ViewModel extends ChangeNotifier {

    count = 0;

    plus() {
        this.count++;
        this.notifyListeners();
    }

}


