import Image from 'next/image'
import HeadContent from '../components/layout/Head'
import Navigation from '../components/layout/Nav'
import Heading from '../components/layout/Heading'
import axios from 'axios'
import { api } from '../utils/api'

export default function Home(props) {
  return (
    <>
      <HeadContent title="Main page" description="This is the page" />

      <Navigation />
      <Heading title="Persons of Interest" />

      <div className="character-list">
        {props.characters.map((character) => {
          return (
          <a className="character-card" key={character.id} href={`detail/${character.id}`}>
            <Image src={character.image} alt={character.name} width="250px" height="250px" />
            <h3>{character.name}</h3>
          </a>);
        })}
      </div>
    </>
  )
}

export async function getStaticProps() {
  let characters = [];

  try {
    const response = await axios.get(api);
    characters = response.data.results;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      characters: characters,
    }
  }
}
