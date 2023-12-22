const AulaPlayer = ({ video }) => {
    console.log(video)
    console.log('video')
    return (
        <iframe
            width="80%"
            height="450px"
            src={video}
            title="YouTube video player"
            frameBorder="0"
        ></iframe>
    )
}
 export default AulaPlayer