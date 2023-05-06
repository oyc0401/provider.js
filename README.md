# Provider.js
바닐라 자바스크립트를 위한 상태관리 라이브러리

## 사용방법

### 시작하기 전에
module을 사용해 script태그에서 import가 가능하게 만듭니다.

```html
<script type="module" src="index.js"></script>
```

### Provider 생성

생성자를 사용해 Provider 객체를 만듭니다.

매개변수로 사용할 뷰모델을 만들어 넣습니다.

```javascript
let provider = new Provider(new ViewModel());
```

### 값 읽어오기
`provider.watch()`를 사용해 값을 읽어옵니다.

콜백함수 안에 뷰모델이 변경될 때 UI가 변경되는 코드를 적습니다.

콜백함수 매개변수에 있는 `model`에서 값을 가져올 수 있습니다.

```javascript
provider.watch(function (model) {
    let count = document.getElementById("count");
    count.innerText = `${model.count}`;
})
```

### 값 변경하기

`provider.read()`를 사용해 값을 변경합니다.

콜백함수 안에 뷰모델을 변경하는 코드를 적습니다.

콜백함수 매개변수에 있는 `model`에서 값을 변경할 수 있습니다.

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

```javascript
export class ViewModel extends ChangeNotifier {

    count = 0;

    plus() {
        this.count++;
        this.notifyListeners();
    }
}
```

## 카운터 웹

아래는 카운터 웹 사이트의 예제코드입니다.

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

view_model.js

```javascript
import {ChangeNotifier} from "../service/provider.js"

export class ViewModel extends ChangeNotifier {

    count = 0;

    plus() {
        this.count++;
        this.notifyListeners();
    }
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

