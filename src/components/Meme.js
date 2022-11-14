import React, { useState } from "react";

export default function Meme() {
  // const [memeImage, setMemeImage] = React.useState("http://i.imgflip.com/1bij.jpg");

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMeme, setAllMeme] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMeme(data.data.memes))
  }, [])

  const getMemeImage = () => {
    const memesArray = allMeme;
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const url = memesArray[randomNumber].url;
    setMeme(prevMeme => {
      return {...prevMeme, randomImage: url}
    })
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setMeme(prevMeme => {
      return {
        ...prevMeme,
        [name]: value
      }
    })
  }

  return (
    <main>
      <div className="form">
        <input 
          type="text" 
          className="form--input" 
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input 
          type="text" 
          className="form--input" 
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className="form--button">Get a new meme image 🖼 </button>
      </div>
      <div className="meme">
        <img className="meme--image" src={meme.randomImage}/>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  )
}