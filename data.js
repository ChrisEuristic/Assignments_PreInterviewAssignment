const GAME_COST = 100;
const DAYTIME = 86400000; // 1일에 해당하는 DateTime 값

const product = {
  A: ["콜라", "사이다", "샐러드", "감자튀김", "샌드위치", "감자칩", "우유"],
  B: ["치킨", "피자", "햄버거"],
};

export class Customer {
  constructor(initMoney) {
    this.wallet = initMoney;
    this.bag = [];
  }

  DRAW() {
    do {
      this.lot = prompt("희망 플레이 횟수를 입력해주세요.") ?? 0;
      this.playingTime = new Date();
    } while (GAME_COST * this.lot > this.wallet);
    return [this.lot, this.playingTime];
  }

  pay() {
    this.wallet -= GAME_COST;
    return GAME_COST;
  }

  takeProduct(product) {
    if (product === "꽝") {
      // alert("ㅠㅠ 꽝이다...");
      console.log("ㅠㅠ 꽝이다...");
      return;
    }
    this.bag.push(product);
    // alert(`와! ${product.name} 받았다!`);
    console.log(`와! ${product.name} 받았다!`);
  }

  getTakenBProductCount() {
    let takenBProductCount = 0;

    for (let item of this.bag) {
      if (item.grade === "B") takenBProductCount++;
    }

    return takenBProductCount;
  }

  getTakenProductCount() {
    let takenAProductCount = 0;
    let takenBProductCount = 0;

    for (let item of this.bag) {
      if (item.grade === "A") takenAProductCount++;
      else takenBProductCount++;
    }

    return [takenAProductCount, takenBProductCount];
  }
}

export class Pachinko {
  inventory = {
    치킨: [],
    피자: [],
    햄버거: [],
    콜라: [],
    사이다: [],
    샐러드: [],
    감자튀김: [],
    샌드위치: [],
    감자칩: [],
    우유: [],
  };

  constructor() {
    this.cashBox = 0;

    for (let i = 0; i < 1000; i++) {
      const itemA = product.A[Math.floor(Math.random() * product.A.length)];
      const randomDateA = new Date(
        new Date().getTime() +
          Math.floor(Math.random() * DAYTIME * 7) -
          DAYTIME * 3
      );
      // 유통기한 랜덤 설정. 함수 동작 시점으로부터 3일 전부터 4일 후까지 생성.

      this.inventory[itemA].push({
        name: itemA,
        grade: "A",
        expirationDate: randomDateA,
      });

      const itemB = product.B[Math.floor(Math.random() * product.B.length)];
      const randomDateB = new Date(
        new Date().getTime() + Math.floor(Math.random() * 604800000) - 259200000
      );
      // 유통기한 랜덤 설정. 함수 동작 시점으로부터 3일 전부터 4일 후까지 생성.

      this.inventory[itemB].push({
        name: itemB,
        grade: "B",
        expirationDate: randomDateB,
      });
    }
  }

  paid(paidMoney) {
    this.cashBox += paidMoney;
  }

  onGame(takenBProductCount, CustomerPlayingTime, gameResult = null) {
    if (!gameResult) {
      if (Math.random() < 0.9) {
        const pickProduct = Math.floor(Math.random() * product.A.length);
        // A 상품 중 어느 것을 고객에게 내어줄지?
        let pickProductNumber;

        while (true) {
          pickProductNumber = this.inventory[product.A[pickProduct]].length - 1;

          if (
            this.inventory[product.A[pickProduct]][pickProductNumber][
              "expirationDate"
            ].getTime() <
            CustomerPlayingTime + DAYTIME
          ) {
            // 꺼낸 상품의 유통기한이 게임 시작 시간으로부터 만 1일 이전이라면 폐기 후 다른 상품을 꺼냄.
            this.inventory[product.A[pickProduct]].pop();
            continue;
          }
          // 유통기한이 충분히 남아있으면 상품 리턴.
          return this.inventory[product.A[pickProduct]][pickProductNumber];
        }
      } else {
        return this.onGame(
          takenBProductCount,
          CustomerPlayingTime,
          (gameResult = "Not A")
        );
      }
    } else {
      console.log("B 상품 받은 개수 >> ", takenBProductCount);
      if (Math.random() < 0.1 && takenBProductCount < 3) {
        const pickProduct = Math.floor(Math.random() * product.B.length);
        // B 상품 중 어느 것을 고객에게 내어줄지?
        let pickProductNumber;

        while (true) {
          pickProductNumber = this.inventory[product.B[pickProduct]].length - 1;

          if (
            this.inventory[product.B[pickProduct]][pickProductNumber][
              "expirationDate"
            ].getTime() <
            CustomerPlayingTime + DAYTIME
          ) {
            // 꺼낸 상품의 유통기한이 게임 시작 시간으로부터 만 1일 이전이라면 폐기 후 다른 상품을 꺼냄.
            this.inventory[product.B[pickProduct]].pop();
            continue;
          }
          // 유통기한이 충분히 남아있으면 상품 리턴.
          return this.inventory[product.B[pickProduct]][pickProductNumber];
        }
      }
      return "꽝";
    }
  }
}
