import { useState } from "react";

const GetDetails = () => {
    const [teamName, setTeamName] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);
    const [screenshot, setScreenshot] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/v1/test?teamName=${teamName}`,{
                METHOD : 'GET',
            });
            const data = await response.json();

            if (response.ok) {
                setTeamMembers(data.teamMembers);
                setScreenshot(data.screenshot); 
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
            <h2 className="text-xl font-bold">Search Team Members</h2>
            <form onSubmit={handleSubmit} className="my-4">
                <input
                    type="text"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            {teamMembers.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Team Members:</h3>
                    <ul className="list-disc ml-5">
                        {teamMembers.map((member, index) => (
                            <li key={index}>{member.name} - {member.email}</li>
                        ))}
                    </ul>
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
