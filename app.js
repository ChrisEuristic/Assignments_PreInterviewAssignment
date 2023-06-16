import { Customer, Pachinko } from './data.js';

const customer = new Customer(10000); // 고객 만원 충전
const pachinko = new Pachinko();      // 게임 기계 생성

console.log("상품 재고 랜덤 생성 : ", pachinko.inventory);

const [hopeGameLot, beginningTime] = customer.DRAW();
// 희망 게임 횟수와 게임 시작 시점 초기화.

let playedGameLot = 0;

while(playedGameLot < hopeGameLot){
  pachinko.paid(customer.pay());
  // 고객이 파친코에 돈을 넣음.

  /**
   * 고객이 지닌 B 상품의 개수
   */
  const takenBProductCount = customer.getTakenBProductCount();
  /**
   * 고객의 게임 시작 시간(밀리초)
   */
  const beginningTime = customer.playingTime.getTime();

  customer.takeProduct(pachinko.onGame(takenBProductCount, beginningTime));
  // 고객이 몇 개의 B 등급 상품을 받았는지 확인하여 게임 시작.
  // 파친코 룰렛을 돌리고 결과를 고객이 받음.
  // 꽝이면 울고 상품이면 환호하며 가방에 담음.

  playedGameLot++;
}

console.log(customer.getTakenProductCount());
alert("게임이 종료되었습니다.")
