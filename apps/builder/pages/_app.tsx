import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from 'libs/theme'
import { useRouterProgressBar } from 'libs/routerProgressBar'
import 'assets/styles/routerProgressBar.css'
import 'assets/styles/plate.css'
import 'focus-visible/dist/focus-visible'
import 'assets/styles/submissionsTable.css'
import 'assets/styles/codeMirror.css'
import 'assets/styles/custom.css'
import { UserContext } from 'contexts/UserContext'
import { TypebotContext } from 'contexts/TypebotContext'
import { useRouter } from 'next/router'
import { KBarProvider } from 'kbar'
import { actions } from 'libs/kbar'
import { enableMocks } from 'mocks'
import { SupportBubble } from 'components/shared/SupportBubble'
import { WorkspaceContext } from 'contexts/WorkspaceContext'

if (process.env.NEXT_PUBLIC_E2E_TEST === 'enabled') enableMocks()

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  useRouterProgressBar()
  const { query, pathname } = useRouter()

  useEffect(() => {
    pathname.endsWith('/edit')
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [pathname])

  const typebotId = query.typebotId?.toString()
  return (
    <ChakraProvider theme={customTheme}>
      <KBarProvider actions={actions}>
        <SessionProvider session={session}>
          <UserContext>
            {typebotId ? (
              <TypebotContext typebotId={typebotId}>
                <WorkspaceContext>
                  <Component />
                  <SupportBubble />
                </WorkspaceContext>
              </TypebotContext>
            ) : (
              <WorkspaceContext>
                <Component {...pageProps} />
                <SupportBubble />
              </WorkspaceContext>
            )}
          </UserContext>
        </SessionProvider>
      </KBarProvider>
    </ChakraProvider>
  )
}

export default App
