// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;

// To store list of all campaigns stared when registering disasters
contract CampaignFactory {
    address[] public deployedCampaigns;
    uint public campaignCount;
    struct CampaignLocal {
        string title;
        address owner;
        address campaignAddress;
        string imgURI;
        uint timestamp;
        string category;
    }

    //list of campaigns
    CampaignLocal[] public campaignList;

    event campaignCreated(
        string title,
        address indexed owner,
        address campaignAddress,
        string imgURI,
        uint indexed timestamp,
        string category
    );

    constructor() {
        campaignCount = 0;
    }

    //To start campaign for disaster by calling Campaign contract 
    function createCampaign(
        string memory campaignTitle,
        string memory imgURI,
        string memory category,
        string memory storyURI
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle,
            imgURI,
            storyURI,
            msg.sender
        );
        CampaignLocal memory campaign = CampaignLocal(
            campaignTitle,
            msg.sender,
            address(newCampaign),
            imgURI,
            block.timestamp,
            category
        );

        deployedCampaigns.push(address(newCampaign));
        campaignList.push(campaign);
        campaignCount++;
        emit campaignCreated(
            campaignTitle,
            msg.sender,
            address(newCampaign),
            imgURI,
            block.timestamp,
            category
        );
    }

    //returns list of all disasters
    function listCampaigns() public view returns (CampaignLocal[] memory) {
        CampaignLocal[] memory listCamp = new CampaignLocal[](campaignCount);
        for (uint i = 0; i < campaignCount; i++) {
            CampaignLocal storage camp = campaignList[i];
            listCamp[i] = camp;
        }
        return listCamp;
    }
}

//To start campaign to raise funds when registering disaster
contract Campaign {

    //To store details of missing person
    struct Person {
        uint personId;
        string firstName;
        string lastName;
        uint age;
        string contactNumber;
        string photoUrl;
        string additionInfoUrl;
    }
    
    //To store all donations made 
    struct Donation {
        address donar;
        uint amount;
        uint timestamp;
    }

    string public title;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;
    Person[] public missingPeople;
    Donation[] public donations;
    uint public peopleCount;
    uint public donationCount;

    event donated(
        address indexed donar,
        uint indexed amount,
        uint indexed timestamp
    );

    event missingPersonAdded(
        string firstName,
        string lastName,
        uint age,
        string contactNumber,
        string photoUrl,
        string additionalInfoUrl
    );

    constructor(
        string memory campaignTitle,
        string memory imgURI,
        string memory storyURI,
        address campaignOwner
    ) {
        title = campaignTitle;
        image = imgURI;
        story = storyURI;
        owner = payable(campaignOwner);
        peopleCount = 0;
        donationCount = 0;
    }

    //To accept donations made for disaster
    function donate() public payable {
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        Donation memory donateObj = Donation(
            msg.sender,
            msg.value,
            block.timestamp
        );
        donations.push(donateObj);
        donationCount++;
        emit donated(msg.sender, msg.value, block.timestamp);
    }

    //To store all detaills of missing persons during disaster
    function addMissingPerson(
        string memory firstName,
        string memory lastName,
        uint age,
        string memory contactNumber,
        string memory photoUrl,
        string memory additionalInfoUrl
    ) public {
        peopleCount++;
        Person memory new_person = Person(
            peopleCount,
            firstName,
            lastName,
            age,
            contactNumber,
            photoUrl,
            additionalInfoUrl
        );
        missingPeople.push(new_person);
        emit missingPersonAdded(
            firstName,
            lastName,
            age,
            contactNumber,
            photoUrl,
            additionalInfoUrl
        );
    }

    //To return list of all missing persons in disaster
    function listMissingPersons() public view returns (Person[] memory) {
        Person[] memory listPpl = new Person[](peopleCount);
        for (uint i = 0; i < peopleCount; i++) {
            Person storage missingPerson = missingPeople[i];
            listPpl[i] = missingPerson;
        }
        return listPpl;
    }

    //To retuns list of all donations made
    function listDonations() public view returns (Donation[] memory) {
        Donation[] memory listDonate = new Donation[](donationCount);
        for (uint i = 0; i < donationCount; i++) {
            Donation storage donateObj = donations[i];
            listDonate[i] = donateObj;
        }
        return listDonate;
    }
}
