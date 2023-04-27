import ContentLoader from 'react-content-loader'

export default function Loading(props) {
    if (props.type === 2) {
        return (

            <ContentLoader viewBox="0 0 388 31 " height={50} width={"100%"} backgroundColor="#fefefe99"
                foregroundColor=" #5160bc88" {...props}>
                <rect x="0" y="15" rx="4" ry="4" width="130" height="10" />
                <rect x="155" y="15" rx="3" ry="3" width="130" height="10" />
                <rect x="295" y="15" rx="3" ry="3" width="90" height="10" />


            </ContentLoader>
        )
    }
    return (

        <ContentLoader viewBox="0 0 388 31 " height={50} width={"100%"} backgroundColor="#fefefe99"
            foregroundColor=" #5160bc00" {...props}>
            <rect height="5.5" rx="1" ry="1" width="340" x="31" y="5" />
            <rect height="5.5" rx="1" ry="1" width="340" x="31" y="15" />
            <rect height="24" rx="0" ry="0" width="24" x="0" y="0" />
        </ContentLoader>
    )
}