import { useEffect, useState } from "react"

export function useCatImage ({fact}) {
    const CAT_PREFIX_IMAGE_URL = 'https://api.thecatapi.com/v1/images/search'
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        

        fetch(CAT_PREFIX_IMAGE_URL)
        .then(res => res.json())
        .then(data => {
            const imageUrl = data[0].url
            setImageUrl(imageUrl)
        })
    }, [fact])

    return {imageUrl}
}