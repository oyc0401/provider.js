# Provider.js
바닐라 자바스크립트를 위한 상태관리 라이브러리

순수한 자바스크립트로 플러터의 Provider패턴을 구현하는 것을 목표로 합니다.





### 시작하기 전에
- module을 사용해 script 태그에서 import가 가능하게 만듭니다.

```html
<script type="module" src="index.js"></script>
```

- 파일을 다운받고, service 폴더에 있는 `provider.js`를 프로젝트 폴더에 옮겨줍니다.

## 사용방법

### Provider 생성

생성자를 사용해 Provider 객체를 만듭니다.

사용할 뷰모델을 생성자 매개변수에 넣습니다.

```javascript
let provider = new Provider(new ViewModel());
```

### 값 읽어오기
`provider.watch()`를 사용해 값을 읽어옵니다.

익명함수 안에 뷰모델이 변경될 때 UI가 변경되는 코드를 적습니다.

익명함수 매개변수인 `model`을 통해 값을 가져옵니다.

```javascript
provider.watch(function (model) {
    let count = document.getElementById("count");
    count.innerText = `${model.count}`;
    
})
```

### 값 변경하기

`provider.read()`를 사용해 값을 변경합니다.

익명함수 안에 뷰모델을 변경하는 코드를 적습니다.

익명함수 매개변수인 `model`을 통해 값을 변경합니다.

```javascript
provider.read(function (model) {
    let button = document.getElementById("button");
    button.addEventListener("click", function () {
        model.plus();
    });
    
})
```

## ChangeNotifier

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

index.css

```css
body {
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.column {
    display: flex;
    flex: 10;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#count {
    font-size: 32px;
}

#button {
    font-size: 32px;
    width: 90px;
    height: 50px;
}
```

index.js

```javascript
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

