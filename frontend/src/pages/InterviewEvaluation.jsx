function InterviewEvaluation(){

return(
<div>

<h1>Interview Evaluation Form</h1>

<label>Candidate Name:</label>
<input placeholder="Enter name"/>

<br/><br/>

<label>Technical Skills Rating:</label>
<input type="number" min="1" max="5"/>

<br/><br/>

<label>Comments:</label>
<br/>

<textarea />

<br/><br/>

<button>Submit Evaluation</button>

</div>
);

}

export default InterviewEvaluation;