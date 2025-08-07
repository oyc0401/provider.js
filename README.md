# Provider.js
바닐라 자바스크립트를 위한 상태관리 라이브러리

순수한 자바스크립트로 플러터의 Provider패턴을 구현하는 것을 목표로 합니다.





### 시작하기 전에

- 파일을 다운받고, service 폴더에 있는 `provider.js`를 프로젝트 폴더에 옮겨줍니다.


- module을 사용해 script 태그에서 import가 가능하게 만듭니다.

```html
<script type="module" src="index.js" defer></script>
```



## 사용방법

## 뷰모델 만들기

뷰모델은 `ChangeNotifier`클래스를 상속 받습니다.

데이터를 변경한 후, 데이터가 변경된 것을 알리기 위해 `this.notifyListeners()`를 실행합니다.

```javascript
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
```
## UI 다루기

### Provider 생성

`Provider.instance`로 Provider를 생성합니다.

사용할 뷰모델 인스턴스를 인자로 전달합니다.

```javascript
const provider = Provider.instance(new ViewModel())
```

### 값 읽기
`provider.watch()`를 사용해 상태를 구독할 수 있습니다.

콜백 함수의 model을 통해 상태 값을 가져오며, `notifyListeners()`가 실행되면 해당 콜백이 다시 실행됩니다.

```javascript
provider.watch(function (model) {
    const count = document.getElementById("count");
    count.innerText = `${model.count}`;
    
})
```

### 값 쓰기

`provider.model`을 통해 뷰모델에 접근해 상태를 변경할 수 있습니다.

```javascript
const button = document.getElementById("button");
button.addEventListener("click", function () {
    provider.model.plus();
});

```


## 카운터 웹

아래는 카운터 웹의 예제코드입니다.

index.html

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="module" src="index.js"></script>
    <link rel="stylesheet" href="index.css"/>
</head>
<body>
<div class="column">
    <div id="count">0</div>
    <div style="height: 8px;"></div>
    <button id="button">+</button>
</div>
</body>
</html>
```


index.js

```javascript
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

```


view_model.js

```javascript
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
```

