import CandidateCard from "./candidiateCard"

const Voting = ({candidiate,input,setInput,voting}) => {
    return(
        <div>
            <h2 className='text-4xl bolder text-[#1d4ed8] pb-8'>
            Welcome to VMS_Assignment
            </h2>
            <div className='py-3 text-[#020617]'>
            Voting for...
            </div>
                <form className='flex items-center justify-center'>
                    <input
                    className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]'
                    placeholder='Candidates Name'
                    value = {input}
                    onChange={e => setInput(e.target.value)}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded ml-2 mb-2.5"
                    onClick={voting}>
                        Vote 
                    </button>
                </form>
                <h2 className="text-blue mt-1">Available Candidate to vote:</h2>
                <ul>
                    {candidiate.map(item => (
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

export default Voting