import Link from 'next/link'
import Logo from './logo'
import ThemeToggle from './theme-toggle'
import MobileMenu from './mobile-menu'
import { LanguageSwitcher } from "../language-switcher"
import { defaultLocale } from '@/i18n/config'
import { useLocale } from 'next-intl'
export default function Header() {
  const currentLocale = useLocale()
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-5">
            <Link href={ currentLocale === defaultLocale ? '/' : `/${currentLocale}`} className="block" title="yes or no wheel">
              <Logo />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow flex-wrap items-center font-medium">
              <li>
                <Link
                  href={currentLocale === defaultLocale ? '/about' : `/${currentLocale}/about`}
                  title="yes or no wheel about"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
            </ul>

            
            <LanguageSwitcher className="ml-3" />
            
            <ThemeToggle className="ml-3" />
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
