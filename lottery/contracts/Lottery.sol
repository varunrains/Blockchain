pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

contract Lottery{
    address public manager;
    address[] public players;
    
    //Whoever is accessing the contract 
    //the address will be stored
    //Instance of Contract
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        //Adding validation
        //msg.value will be in wei
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint){
        //sha3,block are a global variable
     return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted{
       
        uint index = random() % players.length;
        //Every reference address has some object
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    modifier restricted(){
         require(msg.sender == manager);
         _;
    }
    
    function getPlayers() public view returns (address[]){
        return players;
    }
}