import Image from 'next/image'
import { useTranslations } from 'next-intl'
export default function Process({ params: {toolname="" } }: { params: { toolname?: string } }) {
  const t = useTranslations(`${toolname}.process`)
  const items = t.raw('items') as Array<{
    image: string
    alt: string
    p: string
    h3: string
  }>
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-200 dark:border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-red-hat-display mb-4">{t('h2')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{ t('p')}</p>
          </div>

          {/* Items */}
          <div className="max-w-6xl mx-auto space-y-20">
            {/* 1st item */}
            {items.map((item, index) => {
              return (
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2">
                    <div className="inline-flex w-12 h-12 rounded-full bg-teal-400 dark:bg-teal-600 dark:bg-opacity-25 text-white dark:text-teal-400 font-medium items-center justify-center mb-6">{ index + 1 }</div>
                    <h3 className="h4 font-red-hat-display mb-3">{item.h3}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{ item.p}</p>
                  </div>
                  <div className="md:w-1/2 mt-8 md:mt-0">
                    <div className="relative max-w-md mx-auto">
                      <Image
                        src={item.image}
                        width={500}
                        height={400}
                        className="rounded-lg shadow-lg"
                        alt="Enter options in Yes or No Wheel"
                      />
                    </div>
                  </div>
                </div>)
            })}
          </div>

        </div>
      </div>
    </section>
  )
}