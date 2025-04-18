import './App.css'
import { useCatImage } from './hooks/useCatImage.js'
import { useCatFact } from './hooks/useCatFact.js'

//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirsWord}?fontSize=50&fontColor=red&json=true`


export function App() {
  const { fact, refreshFact } = useCatFact()
  const {imageUrl} = useCatImage({fact})


  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick }>Get new image</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={`${imageUrl}`} alt={`Image extracted using the first trhee words of: ${fact}`} /> }
    </main>
  )
}

export default App
