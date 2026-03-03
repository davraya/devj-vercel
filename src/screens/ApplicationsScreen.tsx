import { useEffect } from "react";
import "./ApplicationsScreen.css";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getUserInterviews } from "../api/interview";
import { addInterviewLocal, setInterviews } from "../redux/interviewSlice";
import { useDispatch } from "react-redux";
import InterviewCard from "../components/InterviewCard";
import { addInterview } from "../api/interview";
import { type Interview } from "../types/Interview";




const ApplicationsScreen = () => {

    const jwtToken = useSelector((state: RootState) => state.app.jwtToken);
    const userId = useSelector((state: RootState) => state.app.userId);
    const interviews = useSelector((state: RootState) => state.interviews.items);
    const dispatch = useDispatch();

    const handleAddApplication = async () => {
            if (!userId || !jwtToken ) return;
            try{
                const newEntry = await addInterview(userId, jwtToken, "", "", "APPLIED", "","");

                const interview: Interview = {
                    id: newEntry.id,
                    position: "",
                    company: "",
                    status: "APPLIED",
                    interviewer: "",
                    notes: ""
                };

                dispatch(addInterviewLocal(interview));
    
            } catch (err) {
                console.error("Failed to add application", err);
            }
        }

    useEffect(() => {
    
            const runAsync = async () => {
                if (!jwtToken || !userId) return;
                const interviews = await getUserInterviews(userId, jwtToken);
                dispatch(setInterviews(interviews));
            };
    
            runAsync();
        }, [jwtToken, userId, dispatch]);

    

    return (
        <div className="applications-screen">
            <button className="add-application-button" onClick={handleAddApplication}> Add Application</button>
            <div className="interviews-list">
            {interviews.map((interview) => {
                return (
                    <InterviewCard
                        key={interview.id}
                        id={interview.id}
                        position={interview.position}
                        company={interview.company}
                        status={interview.status}
                        interviewer={interview.interviewer}
                        notes={interview.notes}
                    />
                );
            })}
            </div>
        </div>
    )
}

export default ApplicationsScreen;