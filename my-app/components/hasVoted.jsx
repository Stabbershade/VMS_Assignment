const HasVoted = ({resultClick}) => {

    return(
        <div>
            <h1>You have Already Voted!</h1>
            <button onClick={resultClick}
            > Get Result! </button>
        </div>
    )
}

export default HasVoted