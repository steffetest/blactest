// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract BBVerificationTest is Ownable, Pausable  {
    struct Verification {
        address userAddress; 
        string licenseType;
        bool isVerified;
        uint256 timestamp;
    }

    mapping(string => Verification) public verifications;
    uint256 public verificationExpiry = 365 days;

    event VerificationRecorded(string indexed requestId, address indexed userAddress, string licenseType, bool isVerified, uint256 timestamp);
    event VerificationUpdated(string indexed requestId, bool isVerified, uint256 timestamp);
    event VerificationDeleted(string indexed requestId);
    event ReceivedEther(address indexed sender, uint256 amount);
    event FallbackCalled(address indexed sender, uint256 amount, bytes data);

    constructor() Ownable(msg.sender) {
    }

    function recordVerification(string memory requestId, address userAddress, string memory licenseType, bool isVerified) external whenNotPaused {
        require(!verifications[requestId].isVerified, "Verification already recorded");
        require(verifications[requestId].timestamp == 0, "Request ID already exists");

        verifications[requestId] = Verification({
            userAddress: userAddress,
            licenseType: licenseType,
            isVerified: isVerified,
            timestamp: block.timestamp
        });

        emit VerificationRecorded(requestId, userAddress, licenseType, isVerified, block.timestamp);
    }

    function getVerificationStatus(string memory requestId) external view returns (bool, string memory, uint256, address) {
        Verification memory verification = verifications[requestId];
        return (verification.isVerified, verification.licenseType, verification.timestamp, verification.userAddress);
    }

    function updateVerification(string memory requestId, bool newStatus) external onlyOwner {
        require(verifications[requestId].timestamp != 0, "Verification not found");

        verifications[requestId].isVerified = newStatus;
        emit VerificationUpdated(requestId, newStatus, block.timestamp);
    }

    function deleteVerification(string memory requestId) external onlyOwner {
        delete verifications[requestId];
        emit VerificationDeleted(requestId);
    }

    function setVerificationExpiry(uint256 newExpiry) external onlyOwner {
        verificationExpiry = newExpiry;
    }

    function pauseContract() external onlyOwner {
        _pause();
    }

    function unpauseContract() external onlyOwner {
        _unpause();
    }

    receive() external payable {
        emit ReceivedEther(msg.sender, msg.value);
    }

    fallback() external payable {
        emit FallbackCalled(msg.sender, msg.value, msg.data);
    }
}