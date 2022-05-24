import React from 'react'

export const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {!process.env.NEXT_PUBLIC_VIEWER_URL ? (
        <>
          <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>
            NEXT_PUBLIC_VIEWER_URL is missing
          </h1>
          <h2>
            Make sure to configure the viewer properly (
            <a href="https://docs.typebot.io/self-hosting/configuration#viewer">
              https://docs.typebot.io/self-hosting/configuration#viewer
            </a>
            )
          </h2>
        </>
      ) : (
        <>
          <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>{error.name}</h1>
          <h2>{error.message}</h2>
        </>
      )}
    </div>
  )
}
