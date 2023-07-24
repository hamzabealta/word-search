/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { IHeader, useLayout } from '../../core'
import { DefaultTitle } from './page-title/DefaultTitle'

const calculateStickyOffset = (header: IHeader): string => {
  if (header.fixed.desktop && header.fixed.tabletAndMobile) {
    return '{default: "200px", lg: "300px"}'
  }

  if (header.fixed.desktop && !header.fixed.tabletAndMobile) {
    return '{lg: "300px"}'
  }

  if (header.fixed.tabletAndMobile && !header.fixed.desktop) {
    return '{default: "200px", lg: false}'
  }

  return ''
}

const calculateShowSticky = (header: IHeader): boolean => {
  return (
    (header.fixed.desktop && header.fixed.tabletAndMobile) ||
    (header.fixed.desktop && !header.fixed.tabletAndMobile) ||
    (header.fixed.tabletAndMobile && !header.fixed.desktop)
  )
}

export function HeaderWrapper() {

  const { config, classes, attributes } = useLayout()
  const { header } = config
  const [stickyOffset, setStickyOffset] = useState<string>(calculateStickyOffset(header))
  const [showSticky, setShowSticky] = useState<boolean>(calculateShowSticky(header))
  useEffect(() => {
    setStickyOffset(calculateStickyOffset(header))
    setShowSticky(calculateShowSticky(header))
  }, [header])

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '))}
      {...attributes.headerMenu}
      data-kt-sticky={showSticky ? 'true' : 'false'}
      data-kt-sticky-name='header'
      data-kt-sticky-offset={stickyOffset}
    >
      <div
        className={clsx(classes.headerContainer.join(' '), 'd-flex flex-stack flex-wrap gap-2')}
        id='kt_header_container'
      >
        <DefaultTitle />

        {/* begin::Wrapper */}
        <div className='d-flex d-lg-none align-items-center ms-n2 me-2'>
          {/* begin::Aside mobile toggle */}
          <div className='btn btn-icon btn-active-icon-primary' id='kt_aside_toggle'>
            <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-1 mt-1' />
          </div>
          {/* end::Aside mobile toggle */}

          {/* begin::Logo */}

          <Link to='/' className='d-flex align-items-center pt-2 '>

              <img
                alt='Logo'
                className='h-20px logo theme-dark-show'
                src={toAbsoluteUrl('/media/logos/algernoun-dark.svg')}
              />

          </Link>
          {/* end::Logo */}
        </div>
        {/* end::Wrapper */}
      </div>
    </div>
  )
}
