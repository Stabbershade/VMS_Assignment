import CandidateCard from "./candidiateCard"

const GetResult = ({candidateResult}) => {
    return(
        <div>
            <h1>THE WINNER:</h1>
            <ul>
                {candidateResult.map(item => (
                    <CandidateCard
                        key = {item}
                        name = {item}
                        />
                    ))
                }
                </ul>
        </div>
    )
}

export default GetResult