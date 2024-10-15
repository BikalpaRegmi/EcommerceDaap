// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;
//
contract Ecommerce {

    string public name ;
    address public owner  ;

    struct products {
        string id ;
        string name ;
        uint price ;
        string description;
        string category;
        string image;
        uint ratings;
        uint stocks ;
    }

    struct order {
        uint timestamp ;
        products item ;
    }


     mapping (string => products) public allItems ;
     mapping(address => uint) public orderCount ;
     mapping(address=>mapping( uint=>order)) public Orders ;
     string[] public productIds ;


     event List(string  name , uint price , uint quantity);
     event Buy(address buyer , string Id , uint time);

   modifier onlyOwner (){
    require(msg.sender == owner , "Only owner can list the products") ;
    _;
   }

    constructor(){
     name =  "Decentralized Ecommerce" ;
     owner = msg.sender ;
    }

    //we need to list the products , buy the products , withdraw the funds. 

    //Listing the products
    function listProducts (
           string memory _id , 
           string memory _name ,
           uint _price , 
           string memory _description , 
           string memory _category ,
           string memory _image,
           uint _ratings,
           uint _stocks 
           ) public onlyOwner {


            products memory product = products(_id , _name , _price , _description , _category , _image , _ratings , _stocks) ;

            allItems[_id] = product ;
 
           productIds.push(_id);

            emit List(_name , _price  , _stocks);
           }

           //Buying the products
           function buyProduct (string memory _id ) external payable{
            products memory product = allItems[_id] ;

            require(msg.value == product.price , "plz pay exact price") ;

             order memory Order = order(block.timestamp , product) ;
             orderCount[msg.sender]++ ;
             Orders[msg.sender][orderCount[msg.sender]] = Order ;

             allItems[_id].stocks -= 1 ; 
             emit Buy(msg.sender , _id , block.timestamp);

           }

        function withdraw() public onlyOwner {
            (bool sucess ,) = owner.call{value:address(this).balance}("");
            require(sucess);
        }
       
        function getAllProducts() external view returns( products[] memory){
          products[] memory allProducts = new products[](productIds.length) ;

          for(uint i=0 ; i<productIds.length ; i++){
            allProducts[i] = allItems[productIds[i]];
          }

          return allProducts ;
        }

        function getProductCount() public view returns (uint) {
    return productIds.length;
}

}