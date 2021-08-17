pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        //This will create the new contract in the blockchain
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}


contract Campaign {
    //Type or Definition
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address creator) public {
        //Who is attempting to create the contract
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        
        //Only the value true is stored 
        //No actual key will be stored REMEMBER IT
       approvers[msg.sender] = true;
       approversCount++;
        
    }
    
    function createRequest(string description, uint value, address recipient) public restricted{
       
        //we are referring to the RAM (memory)
        //mapping is a reference type hence 
        //No default value is required for reference type
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
            
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount ++;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        //More than 50% should be voting to approve the request
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}