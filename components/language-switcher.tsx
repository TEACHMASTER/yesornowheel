"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { cn } from '@/types/utils'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (locale: Locale) => {
    const currentLocale = pathname.split('/')[1] as Locale
    
    if (pathname === '/' || !locales.includes(currentLocale)) {
      router.push(`/${locale}`)
      return
    }

    const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, '') || '/'
    const newPath = `/${locale}${pathWithoutLocale}`
    
    console.log({
      pathname,
      currentLocale,
      pathWithoutLocale,
      newPath
    })

    router.replace(newPath)
  }

  const currentLocale = pathname.split('/')[1] as Locale || 'en'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn("hover:bg-transparent", className)}
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">切换语言</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px]">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`
              flex items-center justify-center cursor-pointer
              transition-colors duration-200
              ${currentLocale === locale ? 'bg-muted' : 'hover:bg-muted/50'}
              ${currentLocale === locale ? 'text-primary font-medium' : ''}
            `}
          >
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
