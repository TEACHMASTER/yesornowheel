import { useTranslations } from 'next-intl'

export default function Stats() {  
  const t = useTranslations('index.stats')
  return (
    <section className="relative">
      {/* Background gradient (light version only) */}
      <div className="absolute bottom-0 left-0 right-0 h-128 bg-gradient-to-t from-gray-100 to-white pointer-events-none -z-10 dark:hidden" aria-hidden="true"></div>
      {/* End background gradient (light version only) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="grid grid-cols-2 gap-4 lg:gap-6 md:grid-cols-4 text-center" data-aos-id-stats>
            {/* 1st item */}
            <div className="bg-white dark:bg-gray-800 py-8 px-1 shadow-2xl" data-aos="fade-down" data-aos-anchor="[data-aos-id-stats]">
              <div className="font-red-hat-display text-3xl font-black tracking-tighter mb-1">{t('monthlyUsers')}</div>
              <div className="text-gray-600 dark:text-gray-400">{t('monthlyUsersDesc')}</div>
            </div>
            {/* 2nd item */}
            <div className="bg-white dark:bg-gray-800 py-8 px-1 shadow-2xl" data-aos="fade-down" data-aos-anchor="[data-aos-id-stats]" data-aos-delay="100">
              <div className="font-red-hat-display text-3xl font-black tracking-tighter mb-1">{t('totalDecisions')}</div>
                <div className="text-gray-600 dark:text-gray-400">{t('totalDecisionsDesc')}</div>
            </div>
            {/* 3rd item */}
            <div className="bg-white dark:bg-gray-800 py-8 px-1 shadow-2xl" data-aos="fade-down" data-aos-anchor="[data-aos-id-stats]" data-aos-delay="200">
              <div className="font-red-hat-display text-3xl font-black tracking-tighter mb-1">{t('optionsRange')}</div>
              <div className="text-gray-600 dark:text-gray-400">{t('optionsRangeDesc')}</div>
            </div>
            {/* 4th item */}
            <div className="bg-white dark:bg-gray-800 py-8 px-1 shadow-2xl" data-aos="fade-down" data-aos-anchor="[data-aos-id-stats]" data-aos-delay="300">
              <div className="font-red-hat-display text-3xl font-black tracking-tighter mb-1">{t('freeForever')}</div>
              <div className="text-gray-600 dark:text-gray-400">{t('freeForeverDesc')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}