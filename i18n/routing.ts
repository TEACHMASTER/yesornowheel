import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { defaultLocale,locales} from './config'
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,
 
  // Used when no locale matches
  defaultLocale:defaultLocale,
  localePrefix: "as-needed", //默认locale不显示子目录
  localeDetection:false //不自动根据环境判断语言
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
createNavigation(routing);