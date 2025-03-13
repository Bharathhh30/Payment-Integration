import { useState } from "react";

const GetDetails = () => {
    const [teamLeaderEmail, setTeamLeaderEmail] = useState("");
    const [teamName,setTeamName] = useState("");
    const [teamLeader,setTeamLeader] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);
    const [utrNumber, setUtrNumber] = useState("");
    const [screenshot, setScreenshot] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://hackathon-site-backend.onrender.com/api/v1/test?teamLeaderEmail=${teamLeaderEmail}`,{
                METHOD : 'GET',
            });
            const data = await response.json();

            if (response.ok) {
                setTeamName(data.teamName);
                setTeamLeader(data.teamLeader);
                setTeamMembers(data.teamMembers);
                setScreenshot(data.screenshot); 
                setUtrNumber(data.utrNumber);
                setError(""); // Clear errors
            } else {
                setError(data.message);
                setTeamMembers([]);
            }
        } catch (error) {
            setError("Failed to fetch team details");
            setTeamMembers([]);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Search Team Members Via Email</h2>
            <form onSubmit={handleSubmit} className="my-4">
                <input
                    type="text"
                    placeholder="Enter team leader Email"
                    value={teamLeaderEmail}
                    onChange={(e) => setTeamLeaderEmail(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            {error && <p className="text-red-500">{error}</p>}
            {teamName && (
                <div className="mt-4">
                    <h3 className="font-semibold">Team Name: {teamName}</h3>
                    <h3 className="font-medium">Team Leader: {teamLeader}</h3>
                </div>
            )}
            {teamMembers.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Team Members:</h3>
                    <ul className="list-disc ml-5">
                        {teamMembers.map((member, index) => (
                            <li key={index}>{member.name} - {member.email} - {member.year}</li>
                        ))}
                    </ul>
                </div>
            )}
            {utrNumber && (
                <div className="mt-4">
                    <h3>UTR Number: {utrNumber}</h3>
                </div>
            )}
            {screenshot && (
                <div>
                    <h3>Payment Screenshot:</h3>
                    <img src={screenshot} alt="Payment Screenshot" style={{ width: "300px" }} />
                </div>
            )}
        </div>
    );
};

export default GetDetails;
