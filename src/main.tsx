import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes.tsx'
import GlobalStyles from './assets/globalStyles.ts'
import { AuthProvider } from './auth/AuthProvider'
import { ApolloProvider } from './auth/ApolloContext.tsx'


const getRootNode = () => document.createElement('div')

const appendtoBody = (node: HTMLElement) => {
  document.body.appendChild(node)
}

const rootNode = getRootNode()
appendtoBody(rootNode)

createRoot(rootNode).render(
  <StrictMode>
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <GlobalStyles />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)
