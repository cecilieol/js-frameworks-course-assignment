import axios from 'axios'
import HeadContent from '../../components/layout/Head'
import Image from 'next/image'
import Heading from '../../components/layout/Heading'
import Navigation from '../../components/layout/Nav'
import { api } from '../../utils/api'

export default function Details({ character }) {
  return (
    <>
      <HeadContent title="Details page" description="This is the details page" />

      <Navigation />
      <Heading title={character.name} />

      <div className="details-container">
          <Image src={character.image} alt={character.name} width="300px" height="300px" />
          <div className="details-list">
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
            <p>Origin: {character.origin.name}</p>
          </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
    try {
        const response = await axios.get(api);
        
        const characters = response.data.results;

        const paths = characters.map((character) => ({
            params: { 
                id: character.id.toString() 
            },
        }));

        return { 
            paths: paths, 
            fallback: false 
        };
    } catch (error) {
        console.log(error);
    }
}

export async function getStaticProps({ params }) {
    const url = `${api}/${params.id}`;

    let character = null;

    try {
        const response = await axios.get(url);
        character = response.data;
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            character: character
        },
    };
}