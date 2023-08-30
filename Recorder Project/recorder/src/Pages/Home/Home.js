
import Header from '../Header/Header';
import './home.css';
import { useReactMediaRecorder } from "react-media-recorder"

function Home() {


    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: true }, { audio: true });



    return (
        <>
            <div className='home-cont'>
                <div className='cont'>
                    <div className='btn-cont'>
                        <button onClick={startRecording} className='btn'>Start Recording</button>
                        <button onClick={stopRecording} className='btn'>Stop Recording</button>
                        <p className='status'>{status}</p>
                    </div>
                    <video src={mediaBlobUrl} controls autoPlay loop />
                </div>

            </div>
        </>
    )
}

export default Home