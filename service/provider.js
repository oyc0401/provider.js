// 리액트를 참고해서 만든 flutter의 상태관리 중 하나인
// provider를 참고해서 만든
// 바닐라 자바스크립트 상태 관리 라이브러리

export class Provider {

    #view_model;

    constructor(model) {
        if (!model instanceof ChangeNotifier) {
            console.log(typeof model);
            throw "Provider: ChangeNotifier를 넣어주세요";
        }
        this.#view_model = model;
    }

    watch(fun) {
        this.#view_model.addListener(fun);
        return this;
    }

    read(fun) {
        fun(this.#view_model);
        return this;
    }


}

export class ChangeNotifier {

    #listeners = [];

    notifyListeners() {
        for (let i = 0; i < this.#listeners.length; i++) {
            let fun = this.#listeners[i];
            fun(this);
        }
    }

    addListener(fun) {
        this.#listeners.push(fun);
    }
}


