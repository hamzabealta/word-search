import { createRoot } from 'react-dom/client'
// Axios
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Apps
import { Algernoun18nProvider } from './_metronic/i18n/Algernoun18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'

import { AppRoutes } from './app/routing/AppRoutes'
import { NotificationProvider } from './_metronic/layout/core'


Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <Algernoun18nProvider>
          <NotificationProvider>
              <AppRoutes />
          </NotificationProvider>
      </Algernoun18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
