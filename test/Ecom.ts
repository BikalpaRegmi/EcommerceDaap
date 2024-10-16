import { expect } from "chai";
import { ethers } from "hardhat";
import {Ecommerce} from "../typechain-types"
import { Signer } from "ethers";

describe("Ecommerce", () => {

    let contract: Ecommerce, addr1: Signer, addr2: Signer, owner: Signer;
    let Id: string =  Date.now().toString();
    let name: string = "shoes";
    let price: bigint = ethers.parseEther("0.01");
    let description: string = "very rare shoes";
    let category: string = "fashion";
    let image: string = 
      "https://ipfs.io/ipfs/Qmc9od3MQPPCh1BKPHLJNmTuAxjqnFDjoVHNfoFoFdZ6Ar";
    let ratings: number = 4.0;
    let stocks: number = 3;

    let transaction: any;
   
    beforeEach(async() => {
        const contractFactody =
          await ethers.getContractFactory("Ecommerce");
        [ owner, addr1, addr2 ] = await ethers.getSigners();
        contract = await contractFactody.deploy();
          
    })

    describe('deployment',  () => {
        it('should consist name', async () => {
            expect(await contract.name()).to.eq("Decentralized Ecommerce");
        });

        it("should assign the right owner", async () => {
            const contractOwner:string = await contract.owner();
            expect(contractOwner).to.eq(owner);
        })

    })

    describe("Listing", () => {
      
            
        beforeEach(async () => {
          transaction =   await contract
                
                .listProducts(
                   Id , name , price , description , category , image , ratings , stocks
          );
           await transaction.wait();

        });

        it("Should return items attribute", async () => {
            const item = await contract.allItems(Id);
            expect(item.id).to.eq(Id);
            expect(item.name).to.eq(name);
            expect(item.price).to.eq(price);
            expect(item.description).to.eq(description);
            expect(item.category).to.eq(category);
            expect(item.image).to.eq(image);
            expect(item.ratings).to.eq(ratings);
            expect(item.stocks).to.eq(stocks);
        });

        it('should emit list events', async () => {
            expect(transaction).to.emit(contract , "List");
        })

        it("should fail if other try to list", async () => {
           const listByOther =  contract
              .connect(addr1)
              .listProducts(
                Id,
                name,
                price,
                description,
                category,
                image,
                ratings,
                stocks
           );
          await  expect(listByOther).to.be.revertedWith(
              "Only owner can list the products"
            );
        })
        
    })

    describe("Buying", () => {
        let transaction: any;
        
        beforeEach(async () => {
            transaction = await contract.listProducts(
                Id,
                name,
                price,
                description,
                category,
                image,
                ratings,
                stocks
            );
            await transaction.wait();

            transaction = await contract.connect(addr1).buyProduct(Id, { value: price });
        })

        it("Should update the contract balance", async () => {
            const result = await ethers.provider.getBalance(contract.getAddress());
            expect(result).to.eq(price);
        });

        it("should update the buyers count", async () => {
            const res = await contract.orderCount(addr1);
            expect(res).to.eq(1);
        });

        it("should the order of buyer", async () => {
            const res = await contract.Orders(addr1, 1);
            expect(res.timestamp).to.be.greaterThan(0);
            expect(res.item.name).to.eq(name);
        });

        it("should decrease a stock", async () => {
            expect((await contract.allItems(Id)).stocks).to.be.equals(2)
        });

        it("should emit the buy", async () => {
            expect(transaction).to.emit(contract, "Buy");
        })
    });

    describe("Withdrawing", () => {
        let balanceBefore : bigint;
       
        beforeEach(async () => {
            let transaction = await contract.listProducts(
                Id,
                name,
                price,
                description,
                category,
                image,
                ratings,
                stocks
            );

            transaction = await contract.connect(addr1).buyProduct(Id, { value: price });
            await transaction.wait();

            balanceBefore = await ethers.provider.getBalance(owner);

            transaction = await contract.withdraw();
            await transaction.wait()

        });

        it("Should update the owner balance", async () => {
            const balanceAfter = await ethers.provider.getBalance(owner);
            expect(balanceAfter).to.be.greaterThan(balanceBefore);
        });

        it("should clear the contract balance", async () => {
            const balanceOfContract = await ethers.provider.getBalance(contract);
            expect(balanceOfContract).to.eq(0);
        })
    });

   describe("Displaying", () => {
     beforeEach(async () => {
       transaction = await contract.listProducts(
         Id,
         name,
         price,
         description,
         category,
         image,
         ratings,
         stocks
       );
       await transaction.wait();
     });

     it("should display the products", async () => {
       const products = await contract.getAllProducts();
       expect(products.length).to.be.greaterThan(0);
       const product = products[0];
       expect(product.id).to.eq(Id);
       expect(product.name).to.eq(name);
       expect(product.price).to.eq(price);
       expect(product.description).to.eq(description);
       expect(product.category).to.eq(category);
       expect(product.image).to.eq(image);
       expect(product.ratings).to.eq(ratings);
       expect(product.stocks).to.eq(stocks);
     });
   });
    
    describe("Decreasing Stock", () => {
        beforeEach(async () => {
            transaction = await contract.listProducts(
                Id,
                name,
                price,
                description,
                category,
                image,
                ratings,
                stocks
            );
            await transaction.wait();
        });

        it("Should be only decreased by owner", async () => {
            await expect(
                contract.connect(addr1).decreaseStock(Id)
            ).to.be.revertedWith("Only owner can list the products");
        });

        it("Should the stock be more than zero ", async () => {
           
            await contract.decreaseStock(Id);
            await contract.decreaseStock(Id);
            await contract.decreaseStock(Id);
            
            await expect(contract.decreaseStock(Id)).to.be.revertedWith(
                "Stock must be greater than zero"
            );
        });

        it("Should decrease the stock", async () => {
            await contract.decreaseStock(Id);

            const stockAfterReduce = await contract.allItems(Id);

            expect(stockAfterReduce.stocks).to.eq(2);
        })
    });
    
    describe("Displaying myOrders", () => {
        let myOrders : any;
          beforeEach(async () => {
            transaction = await contract.listProducts(
              Id,
              name,
              price,
              description,
              category,
              image,
              ratings,
              stocks
            );
              await transaction.wait();
              
               await contract.buyProduct(Id , {value:price});
              
              myOrders = await contract.getMyOrders();
          });
        
        it("should provide what have we purchased", async () => {
                  const order = myOrders[0];

                  expect(order.timestamp).to.be.greaterThan(0);
                  expect(order.item.id).to.eq(Id);
                  expect(order.item.name).to.eq(name);
                  expect(order.item.price).to.eq(price);
                  expect(order.item.description).to.eq(description);
                  expect(order.item.category).to.eq(category);
                  expect(order.item.image).to.eq(image);
                  expect(order.item.ratings).to.eq(ratings);
                  expect(order.item.stocks).to.eq(stocks);

        })
    })

})