import Head from "next/head"

export default function HeadContent({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" /> 
            <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap" rel="stylesheet"></link>
        </Head>
    )
}