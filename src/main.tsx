import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes.tsx'
import GlobalStyles from './assets/globalStyles.ts'
import { ApolloProvider, AuthProvider, UserLinksProvider } from './auth'
import { ThemeProvider } from './theme'

const getRootNode = () => document.createElement('div')

const appendtoBody = (node: HTMLElement) => {
  document.body.appendChild(node)
}

const rootNode = getRootNode()
appendtoBody(rootNode)

createRoot(rootNode).render(
  <StrictMode>
    <ThemeProvider>
      <ApolloProvider>
        <AuthProvider>
          <UserLinksProvider>
            <BrowserRouter>
              <GlobalStyles />
              <AppRoutes />
            </BrowserRouter>
          </UserLinksProvider>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
)
