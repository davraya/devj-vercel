import { useState, useEffect } from "react";
import "./InterviewCard.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { editInterview } from "../api/interview";
import { updateInterviewLocal } from "../redux/interviewSlice";
import ApplicationMenuOptions from "./ApplicationMenuOptions";




interface InterviewCardProps {
    id: string;
    position: string;
    company: string;
    status: string;
    interviewer: string;
    notes: string;
  
}



const InterviewCard = ({ id, position, company, status, interviewer, notes }: InterviewCardProps) => {
    const [localPosition, setLocalPosition] = useState(position);
    const [localCompany, setLocalCompany] = useState(company);
    const [localStatus, setLocalStatus] = useState(status);
    const [localInterviewer, setLocalInterviewer] = useState(interviewer);
    const [localNotes, setLocalNotes] = useState(notes);

    const userId = useSelector((state: RootState) => state.app.userId);
    const jwtToken = useSelector((state: RootState) => state.app.jwtToken)

    const dispatch = useDispatch();

    useEffect(() => {
            if (!userId || !jwtToken || !id) return;
    
            const timeout = setTimeout(async () => {
                try {
                    await editInterview(
                        userId,
                        jwtToken,
                        id,
                        localPosition,
                        localCompany,
                        localStatus,
                        localInterviewer,
                        localNotes
                    );
                    dispatch(
                        updateInterviewLocal({
                            id: id,
                            position: localPosition,
                            company: localCompany,
                            status: localStatus,
                            interviewer: localInterviewer,
                            notes: localNotes
                        })
                    );
    
                } catch (err) {
                    console.error("Failed to save entry", err);
                    }   
            }, 500);
    
            return () => clearTimeout(timeout); 
        }, [id, localPosition, localCompany, localStatus, localInterviewer, localNotes, userId, jwtToken, dispatch]);

    

    return (
        <div className="interview-entry-card">
            <div className="left">
                <div className="field">
                <span className="label">Position</span>
                <input className=""
                    value={localPosition}    
                    onChange={(e) => setLocalPosition(e.target.value)}  
                    placeholder={"Enter the job title"}/>
                </div>

                <div className="field">
                <span className="label">Company</span>
                <input className=""
                    value={localCompany}    
                    onChange={(e) => setLocalCompany(e.target.value)}  
                    placeholder={"Enter the company name"}/>
                </div>
            </div>

            <div className="center">
                <div className="field">
                <span className="label">Status</span>
                <select className="edit-select" value={localStatus} onChange={(e) => setLocalStatus(e.target.value)}>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
                    <option value="INTERVIEWED">Interviewed</option>
                    <option value="OFFERED">Offered</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="ACCEPTED">Accepted</option>
                </select>
                </div>
            </div>

            <div className="right">
                <div className="right-container">
                    <div className="field">
                    <span className="label">Interviewer</span>
                    <input className=""
                        value={localInterviewer}    
                        onChange={(e) => setLocalInterviewer(e.target.value)}  
                        placeholder={"Enter interviewer’s name"}/>
                    </div>

                    <div className="field">
                        <span className="label">Notes</span>
                        <textarea className=""
                            value={localNotes}    
                            onChange={(e) => setLocalNotes(e.target.value)}  
                            placeholder={"Add any relevant notes"}/>
                    </div>
                </div>
                <ApplicationMenuOptions applicationId={id} />
                

            </div>

        </div>
    )
}

export default InterviewCard;