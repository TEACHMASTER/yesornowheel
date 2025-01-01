import { useTranslations } from 'next-intl'


const gradientColors = [
  'from-indigo-500 to-indigo-400',
  'from-purple-500 to-purple-400',
  'from-teal-500 to-teal-400',
  'from-pink-500 to-pink-400'
]

export default function FeaturesBlocks({params}:{params:{toolname:string}}) {
  const t = useTranslations(`${params.toolname}.features`)
  const items = t.raw('items') as Array<{
    title: string
    description: string
  }>
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-200 dark:border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-red-hat-display">{t('h2')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">{ t('p')}</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto md:max-w-none grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {/* 1st item - Daily Life */}
            {items.map((item, index) => {
              const colorClass = gradientColors[index % gradientColors.length] // 循环使用颜色
              return (
                <div className={ `flex flex-col p-5 group text-white bg-gradient-to-tr ${colorClass} rounded-lg shadow-2xl`}>
                  <svg className="w-8 h-8 mb-3" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current" d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12zm6-12a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0zm-6 8h16v-2H8v2z" />
                  </svg>
                  <div className="font-red-hat-display text-xl font-black tracking-tighter mb-1">{item.title}</div>
                  <div className="grow opacity-80 mb-4">
                    {item.description}
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}