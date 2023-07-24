import { FC } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { App } from '../App'
import { TranslatorWrapper } from '../modules/apps/analysis/translator/TranslatorWrapper'

const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='analysis' element={<TranslatorWrapper />} />     
          <Route path='/*' element={<Navigate to='/analysis' />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
