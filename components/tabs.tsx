'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function FAQ({params}:{params:{toolname:string}}) {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('1')
  const t = useTranslations(`${params.toolname}.tabs`)
  const items = t.raw('items') as Array<{
    id: string
    question: string
    answer: string
  }>
  return (
    <section className="relative border-t border-transparent dark:border-gray-800">
      {/* Background gradient */}
      <div className="absolute inset-0 h-128 dark:opacity-25 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 pointer-events-none" aria-hidden="true"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 font-red-hat-display mb-4">{t('h2')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('p')}</p>
          </div>

          {/* Section content */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-6">
            {/* Questions list */}
            <div className="lg:col-span-1 lg:pr-16">
              {items.map((faq) => (
                <button
                  key={faq.id}
                  className={`w-full text-left font-medium px-3 py-2 mb-2 bg-white hover:bg-gray-50 shadow dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded flex items-center ${
                    selectedQuestion === faq.id 
                      ? 'bg-teal-500 hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-600 dark:bg-opacity-25 dark:hover:bg-opacity-25 text-gray dark:text-teal-400' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setSelectedQuestion(faq.id)}
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Answer content */}
            <div className="lg:col-span-2">
              <div className="text-lg text-gray-600 dark:text-gray-400">
                {items.find(faq => faq.id === selectedQuestion)?.answer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}