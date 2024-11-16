// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BlackBoxVerification {
    struct Verification {
        address userAddress; // user's Ethereum address
        string licenseType; // Type of license verified
        bool isVerified; // Status of verification
        uint256 timestamp; // Time when verification was completed
    }

    // Mapping to store verifications by request ID (using string for simplicity)
    mapping(string => Verification) public verifications;

    // Event for when a verification is completed
    event VerificationRecorded(
        string indexed requestId,
        address indexed userAddress,
        string licenseType,
        bool isVerified,
        uint256 timestamp
    );

    // Function to record a verification outcome
    function recordVerification(string memory requestId, address userAddress, string memory licenseType, bool isVerified) external {
        require(!verifications[requestId].isVerified, "Verification already recorded");

        // Store verification details
        verifications[requestId] = Verification({
            userAddress: userAddress,
            licenseType: licenseType,
            isVerified: isVerified,
            timestamp: block.timestamp
        });

        // Emit an event for transparency
        emit VerificationRecorded(requestId, userAddress, licenseType, isVerified, block.timestamp);
    }

    // Function to get verification status by requestId
    function getVerificationStatus(string memory requestId) external view returns (bool, string memory, uint256, address) {
        Verification memory verification = verifications[requestId];
        return (verification.isVerified, verification.licenseType, verification.timestamp, verification.userAddress);
    }
}