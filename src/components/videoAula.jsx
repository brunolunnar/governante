export function videoAula(video) {
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