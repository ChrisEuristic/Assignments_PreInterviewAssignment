import { Customer, GAME_COST, Pachinko } from './data.js';

describe('Customer and Pachinko testing', () => {
    let customer;
    let pachinko;

    beforeEach(() => {
        customer = new Customer(1000000); 
        pachinko = new Pachinko(); 
    });

    test('Customer instance creation', () => {
        expect(customer).toBeInstanceOf(Customer);
    });

    test('Pachinko instance creation', () => {
        expect(pachinko).toBeInstanceOf(Pachinko);
    });

    for (let i = 0; i < 100; i++) {
        test(`Test run ${i+1}`, () => {
            const [hopeGameLot, beginningTime] = customer.DRAW();
            let playedGameLot = 0;
            while(playedGameLot < hopeGameLot){
                pachinko.paid(customer.pay());
                const takenBProductCount = customer.getTakenBProductCount();
                const beginningTime = customer.playingTime.getTime();
                customer.takeProduct(pachinko.onGame(takenBProductCount, beginningTime));
                playedGameLot++;
            }

            const [takenAProductCount, takenBProductCount] = customer.getTakenProductCount();
            expect(takenAProductCount).toBeGreaterThanOrEqual(0);
            expect(takenBProductCount).toBeGreaterThanOrEqual(0);
        });
    }
});

describe('Customer and Pachinko additional testing', () => {
  let customer;
  let pachinko;

  beforeEach(() => {
      customer = new Customer(1000000); 
      pachinko = new Pachinko(); 
  });

  test('Customer initial wallet amount', () => {
      expect(customer.wallet).toEqual(1000000);
  });

  test('Customer bag initially empty', () => {
      expect(customer.bag.length).toEqual(0);
  });

  test('Pachinko initial cashBox amount', () => {
      expect(pachinko.cashBox).toEqual(0);
  });

  test('Pachinko inventory initial quantities', () => {
      for(let key in pachinko.inventory){
          expect(pachinko.inventory[key].length).toBeGreaterThanOrEqual(0);
      }
  });

  for (let i = 0; i < 100; i++) {
      test(`Test run ${i+1}`, () => {
          const [hopeGameLot, beginningTime] = customer.DRAW();
          let playedGameLot = 0;
          while(playedGameLot < hopeGameLot){
              pachinko.paid(customer.pay());
              const takenBProductCount = customer.getTakenBProductCount();
              const beginningTime = customer.playingTime.getTime();
              customer.takeProduct(pachinko.onGame(takenBProductCount, beginningTime));
              playedGameLot++;
          }

          const [takenAProductCount, takenBProductCount] = customer.getTakenProductCount();

          // Additional tests for wallet amount, product counts and cashbox amount after game runs
          expect(customer.wallet).toEqual(1000000 - (GAME_COST * playedGameLot));
          expect(pachinko.cashBox).toEqual(GAME_COST * playedGameLot);
          expect(takenAProductCount + takenBProductCount).toEqual(customer.bag.length);
      });
  }
});