import HeadContent from '../components/layout/Head'
import Heading from '../components/layout/Heading'
import Navigation from '../components/layout/Nav'

export default function Home() {
  return (
    <>
      <HeadContent title="Admin page" description="This is the admin page" />

			<Navigation />
			<Heading title="Admin" />
      <p className="text">You are logged in.</p>

    </>
  )
}
