// 리액트를 참고해서 만든 flutter의 상태관리 중 하나인
// provider를 참고해서 만든
// 바닐라 자바스크립트 상태 관리 라이브러리

export class Provider {
    #view_model;

    static instance(model) {
        return new Provider(model);
    }

    get model(){
        return this.#view_model;
    }

    constructor(model) {
        if (!model instanceof ChangeNotifier) {
            throw "Provider: ChangeNotifier를 넣어주세요";
        }
        this.#view_model = model;
    }

    watch(listener) {
        if (typeof listener != "function") {
            throw "Provider.watch: 입력한 리스너를 확인해주세요";
        }

        this.#view_model.addListener(listener);

        this.soonNotify();
        return this;
    }

    flag = false;

    soonNotify() {
        if(this.flag) return; 

        this.flag = true;

         requestAnimationFrame(()=>{
            this.#view_model.notifyListeners();
            this.flag = false;
         })
        
    }


}

export class ChangeNotifier {
    #listeners = [];

    notifyListeners() {
        for (let i = 0; i < this.#listeners.length; i++) {
            let listener = this.#listeners[i];
            listener(this);
        }
    }

    addListener(listener) {
        if (typeof listener != "function") {
            console.log(typeof listener);
            throw "ChangeNotifier.addListener: 리스너만 추가해주세요";
        }
        this.#listeners.push(listener);
    }
}


